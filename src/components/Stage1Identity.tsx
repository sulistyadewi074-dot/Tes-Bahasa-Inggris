import React, { useState } from 'react';
import { CONFIG } from '../config';
import { StudentIdentity } from '../types';
import {
  User,
  Hash,
  ArrowRight,
  School,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Award,
  Sparkles,
  Salad,
} from 'lucide-react';

interface Stage1IdentityProps {
  onStartExam: (identity: StudentIdentity) => void;
  initialIdentity?: StudentIdentity;
}

export const Stage1Identity: React.FC<Stage1IdentityProps> = ({
  onStartExam,
  initialIdentity,
}) => {
  const [nama, setNama] = useState(initialIdentity?.nama || '');
  const [noAbsen, setNoAbsen] = useState(initialIdentity?.noAbsen || '');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi data wajib diisi
    if (!nama.trim()) {
      setErrorMessage('Silakan isi Nama Lengkap terlebih dahulu.');
      return;
    }
    if (!noAbsen.trim()) {
      setErrorMessage('Silakan isi Nomor Absen.');
      return;
    }

    const absenNum = parseInt(noAbsen.trim(), 10);
    if (isNaN(absenNum) || absenNum < 1 || absenNum > 60) {
      setErrorMessage('Nomor absen harus berupa angka antara 1 sampai 60.');
      return;
    }

    setErrorMessage('');
    onStartExam({
      nama: nama.trim(),
      noAbsen: noAbsen.trim(),
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Header Pengumuman Tes */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
          <School className="w-4 h-4 text-emerald-600" />
          <span>{CONFIG.SEKOLAH}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Tes Sumatif {CONFIG.MATA_PELAJARAN} Kelas {CONFIG.KELAS}
        </h2>
        <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto">
          Materi Pokok: <span className="font-bold text-emerald-700">{CONFIG.MATERI}</span>.
          Silakan isi formulir identitas Anda dengan benar dan teliti sebelum memulai pengerjaan tes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Kolom Kiri: Form Identitas Siswa */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>Tahap 1: Formulir Identitas Siswa</span>
              </h3>
              <p className="text-xs text-slate-500">
                Kolom bertanda bintang (<span className="text-red-500 font-bold">*</span>) wajib diisi siswa
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Kelas {CONFIG.KELAS}
            </span>
          </div>

          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="font-semibold">{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nama Lengkap */}
            <div>
              <label
                htmlFor="input-nama-lengkap"
                className="block text-xs font-bold text-slate-700 mb-1.5"
              >
                Nama Lengkap Siswa <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="input-nama-lengkap"
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Contoh: I Putu Agus Wirawan"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                  required
                  autoFocus
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                Ketikkan nama lengkap sesuai daftar hadir kelas.
              </p>
            </div>

            {/* Nomor Absen */}
            <div>
              <label
                htmlFor="input-no-absen"
                className="block text-xs font-bold text-slate-700 mb-1.5"
              >
                Nomor Absen Siswa <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Hash className="w-4 h-4" />
                </div>
                <input
                  id="input-no-absen"
                  type="number"
                  min="1"
                  max="60"
                  value={noAbsen}
                  onChange={(e) => setNoAbsen(e.target.value)}
                  placeholder="Contoh: 12"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                  required
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                Masukkan nomor absen Anda di kelas V (1 - 60).
              </p>
            </div>

            {/* Card Info Tambahan */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <div className="flex items-center justify-between">
                <span>Sekolah:</span>
                <span className="font-bold text-slate-800">{CONFIG.SEKOLAH}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Mata Pelajaran:</span>
                <span className="font-bold text-slate-800">{CONFIG.MATA_PELAJARAN} (Kelas {CONFIG.KELAS})</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Materi Pokok:</span>
                <span className="font-bold text-emerald-700">{CONFIG.MATERI}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Standar Kelulusan (KKTP):</span>
                <span className="font-extrabold text-emerald-700">{CONFIG.KKTP}</span>
              </div>
            </div>

            {/* Tombol Mulai Tes */}
            <div className="pt-2">
              <button
                id="btn-mulai-tes"
                type="submit"
                className="w-full py-3.5 px-5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
              >
                <span>Mulai Tes</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Kolom Kanan: Rincian Info Tes & Ketentuan */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card Komposisi Soal & Aturan */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-400" />
              Komposisi & Format Soal (30 Butir)
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                <span className="text-slate-300">1. Pilihan Ganda (PG)</span>
                <span className="font-bold text-emerald-300">15 Butir</span>
              </div>
              <div className="flex items-center justify-between bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                <span className="text-slate-300">2. Pilihan Ganda Kompleks (PGK)</span>
                <span className="font-bold text-teal-300">5 Butir</span>
              </div>
              <div className="flex items-center justify-between bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                <span className="text-slate-300">3. PGK Kategori (Benar/Salah, Sesuai, dsb.)</span>
                <span className="font-bold text-amber-300">5 Butir</span>
              </div>
              <div className="flex items-center justify-between bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                <span className="text-slate-300">4. Isian Singkat (Short Answer)</span>
                <span className="font-bold text-blue-300">5 Butir</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-slate-300">
                <span>Total Butir Soal:</span>
                <span className="font-extrabold text-white text-sm">30 Soal</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1.5">
              <p className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Soal dan opsi jawaban diacak secara adil untuk setiap siswa saat tes dimulai.</span>
              </p>
              <p className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Seluruh 30 butir soal wajib dijawab sebelum sistem mengizinkan pengiriman tes.</span>
              </p>
              <p className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Tersedia tombol pengunduh naskah soal dalam format PDF di lembar ujian.</span>
              </p>
            </div>
          </div>

          {/* Tips Pengerjaan */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-950">
            <h5 className="font-bold mb-1 flex items-center gap-1.5 text-emerald-900">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Petunjuk Pengerjaan Siswa
            </h5>
            <p className="text-emerald-800 leading-relaxed text-[11px]">
              Bacalah setiap pertanyaan Bahasa Inggris dengan seksama. Untuk soal isian singkat, ketikkan jawaban satu kata dengan ejaan (spelling) yang tepat. Anda dapat berpindah nomor soal menggunakan tombol navigasi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
