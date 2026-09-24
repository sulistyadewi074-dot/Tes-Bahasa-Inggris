import React, { useState, useMemo } from 'react';
import { CONFIG } from '../config';
import {
  Question,
  ShuffledQuestion,
  StudentIdentity,
  AnswerValue,
  ExamResult,
  OptionItem,
} from '../types';
import { gasService } from '../services/gasService';
import { downloadExamQuestionsPDF } from '../utils/pdfGenerator';
import {
  ChevronLeft,
  ChevronRight,
  Send,
  Download,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Loader2,
  User,
  Check,
  Edit3,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react';

interface Stage2ExamProps {
  student: StudentIdentity;
  questions: Question[];
  onFinishExam: (result: ExamResult) => void;
}

// Fisher-Yates shuffle helper
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const Stage2Exam: React.FC<Stage2ExamProps> = ({
  student,
  questions,
  onFinishExam,
}) => {
  // 1. Acak urutan butir soal dan opsi jawaban saat tes dimulai
  const shuffledQuestions = useMemo<ShuffledQuestion[]>(() => {
    const shuffledQ: Question[] = shuffleArray<Question>(questions);

    return shuffledQ.map((q: Question) => {
      if (q.type === 'pg' || q.type === 'pgk') {
        if (q.options && q.options.length > 0) {
          // Acak opsi jawaban tetapi beri label A, B, C, D yang rapi
          const shuffledOpts: OptionItem[] = shuffleArray<OptionItem>(q.options);
          const standardLabels = ['A', 'B', 'C', 'D', 'E'];
          const remappedOptions: OptionItem[] = shuffledOpts.map((opt, idx) => ({
            id: standardLabels[idx] || opt.id,
            text: opt.text,
          }));

          return {
            ...q,
            originalQuestionId: q.id,
            shuffledOptions: remappedOptions,
          };
        }
      }
      return {
        ...q,
        originalQuestionId: q.id,
      };
    });
  }, [questions]);

  // State pengerjaan
  const [currentIndex, setCurrentIndex] = useState(0);
  // Answers state keyed by question index (0 to totalQuestions - 1)
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  // Konfirmasi kirim modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  // Status pengiriman
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const currentQ = shuffledQuestions[currentIndex];
  const totalQuestions = shuffledQuestions.length;

  // Cek apakah soal nomor tertentu sudah dijawab
  const isQuestionAnswered = (idx: number): boolean => {
    const ans = answers[idx];
    if (ans === undefined || ans === null) return false;

    const q = shuffledQuestions[idx];
    if (q.type === 'pg') {
      return typeof ans === 'string' && ans.trim().length > 0;
    }
    if (q.type === 'pgk') {
      return Array.isArray(ans) && ans.length > 0;
    }
    if (q.type === 'pgk_kategori') {
      if (typeof ans === 'object' && !Array.isArray(ans)) {
        const statements = q.statements || [];
        return statements.length > 0 && statements.every((st) => ans[st.id] !== undefined);
      }
      return false;
    }
    if (q.type === 'isian') {
      return typeof ans === 'string' && ans.trim().length > 0;
    }
    return false;
  };

  // Cari daftar nomor soal yang belum dijawab (1-indexed untuk tampilan siswa)
  const unansweredQuestionNumbers = useMemo(() => {
    const missing: number[] = [];
    for (let i = 0; i < totalQuestions; i++) {
      if (!isQuestionAnswered(i)) {
        missing.push(i + 1);
      }
    }
    return missing;
  }, [answers, totalQuestions, shuffledQuestions]);

  // Hitung jumlah soal yang telah dijawab
  const answeredCount = totalQuestions - unansweredQuestionNumbers.length;
  const allAnswered = answeredCount === totalQuestions;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  // Handler jawaban Pilihan Ganda (PG)
  const handleSelectPG = (optionText: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionText,
    }));
  };

  // Handler jawaban Pilihan Ganda Kompleks (PGK)
  const handleTogglePGK = (optionText: string) => {
    setAnswers((prev) => {
      const currentList = Array.isArray(prev[currentIndex]) ? (prev[currentIndex] as string[]) : [];
      if (currentList.includes(optionText)) {
        return {
          ...prev,
          [currentIndex]: currentList.filter((item) => item !== optionText),
        };
      } else {
        return {
          ...prev,
          [currentIndex]: [...currentList, optionText],
        };
      }
    });
  };

  // Handler jawaban PGK Kategori (Benar/Salah, Setuju/Tidak Setuju, Sesuai/Tidak Sesuai)
  const handleSetCategoryStatement = (statementId: string, value: boolean) => {
    setAnswers((prev) => {
      const currentMap =
        typeof prev[currentIndex] === 'object' && !Array.isArray(prev[currentIndex])
          ? { ...(prev[currentIndex] as Record<string, boolean>) }
          : {};
      currentMap[statementId] = value;
      return {
        ...prev,
        [currentIndex]: currentMap,
      };
    });
  };

  // Handler jawaban Isian Singkat
  const handleInputChange = (textValue: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: textValue,
    }));
  };

  // Navigasi soal
  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) setCurrentIndex(currentIndex + 1);
  };

  // Hitung Nilai & Rekap
  const calculateResult = (): ExamResult => {
    let totalScore = 0;
    let benarCount = 0;

    shuffledQuestions.forEach((sq, idx) => {
      const userAns = answers[idx];
      const origQ = questions.find((q) => q.id === sq.originalQuestionId) || sq;

      if (sq.type === 'pg') {
        const correctOpt = origQ.options?.find((o) => o.id === origQ.correctAnswer);
        if (correctOpt && userAns === correctOpt.text) {
          totalScore += 1;
          benarCount += 1;
        }
      } else if (sq.type === 'pgk') {
        const correctKeys = Array.isArray(origQ.correctAnswer) ? origQ.correctAnswer : [];
        const correctTexts = (origQ.options || [])
          .filter((o) => correctKeys.includes(o.id))
          .map((o) => o.text);

        const userSelected = Array.isArray(userAns) ? userAns : [];
        const isMatch =
          correctTexts.length === userSelected.length &&
          correctTexts.every((txt) => userSelected.includes(txt));

        if (isMatch) {
          totalScore += 1;
          benarCount += 1;
        }
      } else if (sq.type === 'pgk_kategori') {
        const statements = origQ.statements || [];
        const userMap = (typeof userAns === 'object' && !Array.isArray(userAns)
          ? userAns
          : {}) as Record<string, boolean>;

        let statementsCorrect = 0;
        statements.forEach((st) => {
          if (userMap[st.id] === st.correctAnswer) {
            statementsCorrect += 1;
          }
        });

        if (statementsCorrect === statements.length) {
          totalScore += 1;
          benarCount += 1;
        } else {
          totalScore += statementsCorrect / (statements.length || 1);
        }
      } else if (sq.type === 'isian') {
        const cleanUser = typeof userAns === 'string' ? userAns.trim().toLowerCase() : '';
        const accepted = (origQ.acceptedAnswers || [origQ.correctAnswer as string] || []).map((a) =>
          String(a).trim().toLowerCase()
        );

        if (cleanUser && accepted.includes(cleanUser)) {
          totalScore += 1;
          benarCount += 1;
        }
      }
    });

    const finalScore = Math.round((totalScore / totalQuestions) * 100);
    const roundedBenar = Math.round(totalScore);
    const salahCount = totalQuestions - roundedBenar;
    const status: 'Lulus' | 'Belum Lulus' = finalScore >= CONFIG.KKTP ? 'Lulus' : 'Belum Lulus';

    return {
      id: `res-${Date.now()}`,
      timestamp: new Date().toLocaleString('id-ID'),
      nama: student.nama,
      noAbsen: student.noAbsen,
      kelas: CONFIG.KELAS,
      benar: roundedBenar,
      salah: salahCount,
      nilai: finalScore,
      status,
      detailJawaban: answers,
    };
  };

  // Proses Kirim Jawaban ke Google Apps Script
  const handleConfirmSubmit = async () => {
    // Validasi ketat seluruh soal harus terjawab
    if (!allAnswered) {
      alert(
        `Masih ada butir soal yang belum dijawab (${unansweredQuestionNumbers.join(', ')}). Harap selesaikan seluruh soal sebelum mengirim jawaban!`
      );
      setShowConfirmModal(false);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const calculatedResult = calculateResult();

    try {
      await gasService.submitExamResult(calculatedResult);
      setIsSubmitting(false);
      setShowConfirmModal(false);
      onFinishExam(calculatedResult);
    } catch (err: any) {
      setIsSubmitting(false);
      setSubmitError(
        err.message ||
          'Gagal mengirim data ke server. Data telah diamankan di perangkat lokal ini.'
      );
    }
  };

  // Opsi aktif untuk soal saat ini
  const currentOptions = currentQ.shuffledOptions || currentQ.options || [];

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6">
      {/* Header Info Siswa & Progres */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-sm shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">{student.nama}</span>
                <span className="text-xs bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded">
                  Absen: {student.noAbsen}
                </span>
                <span className="text-xs bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded border border-emerald-200">
                  Kelas {CONFIG.KELAS}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {CONFIG.SEKOLAH} • {CONFIG.MATA_PELAJARAN} ({CONFIG.MATERI})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tombol Unduh Naskah Soal PDF */}
            <button
              id="btn-download-questions-pdf"
              onClick={() => downloadExamQuestionsPDF(questions)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-300 cursor-pointer"
              title="Unduh Lembar Naskah Soal dalam bentuk PDF"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Unduh Soal (PDF)</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
            <span className="text-slate-600">
              Progres Pengerjaan: <span className="text-emerald-700 font-bold">{answeredCount}</span> dari {totalQuestions} Soal Terjawab
            </span>
            <span className="text-emerald-700 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Layout: Konten Soal + Navigasi Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Kolom Kiri: Lembar Soal Aktif */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200 min-h-[440px] flex flex-col justify-between">
            <div>
              {/* Header Nomor & Tipe Soal */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm sm:text-base font-extrabold px-3 py-1 bg-emerald-700 text-white rounded-xl shadow-2xs">
                    Soal No. {currentIndex + 1}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                    {currentQ.type === 'pg' && 'Pilihan Ganda (PG)'}
                    {currentQ.type === 'pgk' && 'Pilihan Ganda Kompleks (PGK)'}
                    {currentQ.type === 'pgk_kategori' &&
                      `PGK Kategori (${
                        currentQ.categoryType === 'setuju_tidak'
                          ? 'Setuju / Tidak Setuju'
                          : currentQ.categoryType === 'sesuai_tidak'
                          ? 'Sesuai / Tidak Sesuai'
                          : 'Benar / Salah'
                      })`}
                    {currentQ.type === 'isian' && 'Isian Singkat (Short Answer)'}
                  </span>
                </div>
                <span className="text-xs font-medium text-slate-500">
                  {currentQ.topic}
                </span>
              </div>

              {/* Petunjuk Pengisian Berdasarkan Tipe */}
              <div className="mb-4 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-100 inline-block">
                {currentQ.type === 'pg' && 'Pilihlah salah satu jawaban yang paling tepat.'}
                {currentQ.type === 'pgk' && 'Pilihlah seluruh jawaban yang benar (bisa lebih dari satu pilihan).'}
                {currentQ.type === 'pgk_kategori' &&
                  (currentQ.categoryType === 'setuju_tidak'
                    ? 'Tentukan pilihan Setuju atau Tidak Setuju untuk setiap pernyataan.'
                    : currentQ.categoryType === 'sesuai_tidak'
                    ? 'Tentukan pilihan Sesuai atau Tidak Sesuai untuk setiap pernyataan.'
                    : 'Tentukan pilihan Benar atau Salah untuk setiap pernyataan.')}
                {currentQ.type === 'isian' && 'Ketikkan jawaban singkat pada kolom isian di bawah ini.'}
              </div>

              {/* Teks Soal */}
              <div className="text-sm sm:text-base text-slate-900 leading-relaxed font-medium whitespace-pre-line mb-4">
                {currentQ.text}
              </div>

              {/* Tampilan Gambar / Ilustrasi SVG Jika Ada */}
              {currentQ.imageSvg && (
                <div className="mb-6 flex flex-col items-center justify-center p-4 bg-slate-50/90 border border-slate-200 rounded-2xl">
                  <div
                    className="flex items-center justify-center max-w-full overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: currentQ.imageSvg }}
                  />
                  <span className="text-[11px] text-slate-500 mt-2 font-medium">
                    Ilustrasi Gambar Sayuran Sehat
                  </span>
                </div>
              )}

              {/* Tampilan Opsi: Pilihan Ganda (PG) */}
              {currentQ.type === 'pg' && (
                <div className="space-y-2.5">
                  {currentOptions.map((opt) => {
                    const isSelected = answers[currentIndex] === opt.text;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectPG(opt.text)}
                        className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-semibold ring-1 ring-emerald-500'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {opt.id}
                        </div>
                        <span className="text-xs sm:text-sm mt-0.5 leading-normal flex-1">
                          {opt.text}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Tampilan Opsi: Pilihan Ganda Kompleks (PGK) */}
              {currentQ.type === 'pgk' && (
                <div className="space-y-2.5">
                  {currentOptions.map((opt) => {
                    const currentList = Array.isArray(answers[currentIndex])
                      ? (answers[currentIndex] as string[])
                      : [];
                    const isChecked = currentList.includes(opt.text);

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleTogglePGK(opt.text)}
                        className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                          isChecked
                            ? 'border-teal-600 bg-teal-50/70 text-teal-950 font-semibold ring-1 ring-teal-500'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                            isChecked
                              ? 'bg-teal-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {isChecked ? <Check className="w-4 h-4" /> : opt.id}
                        </div>
                        <span className="text-xs sm:text-sm mt-0.5 leading-normal flex-1">
                          {opt.text}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Tampilan Opsi: PGK Kategori */}
              {currentQ.type === 'pgk_kategori' && (
                <div className="space-y-3">
                  {(currentQ.statements || []).map((st, sIdx) => {
                    const ansMap =
                      typeof answers[currentIndex] === 'object' && !Array.isArray(answers[currentIndex])
                        ? (answers[currentIndex] as Record<string, boolean>)
                        : {};
                    const currentVal = ansMap[st.id];

                    const trueLabel = st.trueLabel || (currentQ.categoryType === 'setuju_tidak' ? 'SETUJU' : currentQ.categoryType === 'sesuai_tidak' ? 'SESUAI' : 'BENAR');
                    const falseLabel = st.falseLabel || (currentQ.categoryType === 'setuju_tidak' ? 'TIDAK SETUJU' : currentQ.categoryType === 'sesuai_tidak' ? 'TIDAK SESUAI' : 'SALAH');

                    return (
                      <div
                        key={st.id}
                        className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50/60"
                      >
                        <p className="text-xs sm:text-sm text-slate-800 font-medium mb-3 leading-relaxed">
                          <span className="font-bold text-emerald-700 mr-1.5">
                            {sIdx + 1}.
                          </span>
                          {st.text}
                        </p>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => handleSetCategoryStatement(st.id, true)}
                            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
                              currentVal === true
                                ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{trueLabel}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSetCategoryStatement(st.id, false)}
                            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
                              currentVal === false
                                ? 'bg-rose-600 border-rose-600 text-white shadow-xs'
                                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>{falseLabel}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tampilan Opsi: Isian Singkat */}
              {currentQ.type === 'isian' && (
                <div className="space-y-3 pt-2">
                  <label className="block text-xs font-bold text-slate-700">
                    Ketikkan Jawaban Anda:
                  </label>
                  <div className="relative max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Edit3 className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={typeof answers[currentIndex] === 'string' ? (answers[currentIndex] as string) : ''}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder="Ketikkan jawaban di sini..."
                      className="w-full pl-10 pr-3.5 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium text-slate-800 placeholder:text-slate-400 bg-white"
                      autoComplete="off"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Petunjuk: Perhatikan penulisan ejaan (spelling) kata dalam bahasa Inggris dengan tepat.
                  </p>
                </div>
              )}
            </div>

            {/* Tombol Aksi Bawah: Sebelumnya & Berikutnya */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100 gap-3">
              <button
                id="btn-prev-question"
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="inline-flex items-center gap-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              {currentIndex < totalQuestions - 1 ? (
                <button
                  id="btn-next-question"
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-1 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs cursor-pointer"
                >
                  <span>Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  id="btn-finish-test-prompt"
                  type="button"
                  onClick={() => setShowConfirmModal(true)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Selesai & Kirim Jawaban</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Grid Navigasi Nomor Soal & Ringkasan */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center justify-between">
              <span>Nomor Soal Ujian</span>
              <span className="text-[11px] font-normal text-slate-500">{totalQuestions} Butir</span>
            </h4>

            {/* Grid 30 Soal */}
            <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-5 gap-2 mb-4">
              {shuffledQuestions.map((_, i) => {
                const isCurrent = currentIndex === i;
                const isAnswered = isQuestionAnswered(i);

                let btnClass = 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200';
                if (isAnswered) {
                  btnClass = 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700';
                }
                if (isCurrent) {
                  btnClass = 'bg-emerald-800 text-white border-emerald-800 ring-2 ring-emerald-400 font-extrabold shadow-xs';
                }

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentIndex(i)}
                    className={`h-9 rounded-lg font-bold text-xs flex items-center justify-center border transition-all cursor-pointer ${btnClass}`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>

            {/* Keterangan Warna */}
            <div className="space-y-1.5 pt-3 border-t border-slate-100 text-[11px] text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-800" />
                <span>Soal Sedang Dikerjakan</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-600" />
                <span>Sudah Dijawab ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-200" />
                <span>Belum Dijawab ({unansweredQuestionNumbers.length})</span>
              </div>
            </div>

            {/* Tombol Kirim Utama di Sidebar */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <button
                id="btn-sidebar-submit"
                type="button"
                onClick={() => setShowConfirmModal(true)}
                className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  allAnswered
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>
                  {allAnswered ? 'Selesai & Kirim Jawaban' : 'Kirim Jawaban'}
                </span>
              </button>

              {!allAnswered && (
                <p className="mt-2 text-[11px] text-amber-700 text-center font-medium">
                  Harap jawab seluruh {totalQuestions} soal sebelum mengirim.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Konfirmasi Kirim Jawaban */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Konfirmasi Pengiriman Jawaban
                </h3>
                <p className="text-xs text-slate-500">
                  Periksa kembali kepastian jawaban Anda
                </p>
              </div>
            </div>

            {!allAnswered ? (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs mb-5">
                <p className="font-bold mb-1.5 flex items-center gap-1.5 text-amber-800">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  Peringatan: Belum Semua Soal Dijawab!
                </p>
                <p className="leading-relaxed">
                  Anda baru menjawab <span className="font-bold">{answeredCount}</span> dari {totalQuestions} butir soal. Sesuai ketentuan ujian, Anda <strong>tidak dapat mengirim tes</strong> sebelum seluruh butir soal dijawab.
                </p>
                <div className="mt-2 pt-2 border-t border-amber-200 font-medium">
                  Nomor yang belum dijawab:{' '}
                  <span className="font-bold text-amber-950">
                    {unansweredQuestionNumbers.join(', ')}
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs mb-5 space-y-1.5">
                <p className="font-bold text-sm text-emerald-900">
                  Apakah Anda yakin ingin mengirim jawaban?
                </p>
                <p className="text-emerald-800 leading-relaxed">
                  Seluruh 30 butir soal telah berhasil Anda jawab. Setelah dikirim, nilai akan dihitung otomatis dan tersimpan ke rekap sekolah.
                </p>
              </div>
            )}

            {submitError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs mb-4">
                <p className="font-bold mb-1 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  Status Pengiriman
                </p>
                <p>{submitError}</p>
              </div>
            )}

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                id="btn-cancel-submit"
                type="button"
                disabled={isSubmitting}
                onClick={() => {
                  setShowConfirmModal(false);
                  setSubmitError(null);
                }}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
              >
                {allAnswered ? 'Batal / Periksa Lagi' : 'Kembali Mengerjakan'}
              </button>

              {allAnswered && (
                <button
                  id="btn-confirm-submit-answers"
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleConfirmSubmit}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Mengirim ke Server...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Ya, Kirim Jawaban</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
