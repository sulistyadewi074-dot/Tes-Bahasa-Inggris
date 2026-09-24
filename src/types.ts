/**
 * Definisi Type & Interface Aplikasi Tes Sumatif
 * SD NEGERI 3 LOLOAN TIMUR - KELAS V - BAHASA INGGRIS (HEALTHY VEGETABLES)
 */

export type QuestionType = 'pg' | 'pgk' | 'pgk_kategori' | 'isian';
export type Difficulty = 'Mudah' | 'Sedang' | 'Sukar';

export interface StudentBirthDate {
  hari?: string;
  bulan?: string;
  tahun?: string;
}

export interface StudentIdentity {
  nama: string;
  noAbsen: string;
  tglLahir?: StudentBirthDate;
}

export interface OptionItem {
  id: string; // e.g. 'A', 'B', 'C', 'D'
  text: string;
}

export interface StatementItem {
  id: string; // e.g. 's1', 's2', 's3'
  text: string;
  correctAnswer: boolean; // true or false
  trueLabel?: string; // e.g. 'Benar', 'Setuju', 'Sesuai'
  falseLabel?: string; // e.g. 'Salah', 'Tidak Setuju', 'Tidak Sesuai'
}

export interface Question {
  id: number;
  type: QuestionType;
  text: string;
  imageSvg?: string; // SVG visual untuk ilustrasi sayuran
  options?: OptionItem[]; // Untuk 'pg' (4 opsi) dan 'pgk'
  statements?: StatementItem[]; // Untuk 'pgk_kategori'
  correctAnswer?: string | string[]; // string untuk 'pg', array untuk 'pgk', string untuk 'isian'
  acceptedAnswers?: string[]; // Untuk 'isian' (e.g. ['carrot', 'carrots'])
  categoryType?: 'benar_salah' | 'setuju_tidak' | 'sesuai_tidak'; // Untuk 'pgk_kategori'
  difficulty: Difficulty;
  explanation: string;
  topic: string;
}

export interface ShuffledQuestion extends Question {
  originalQuestionId: number;
  shuffledOptions?: OptionItem[];
}

export type AnswerValue = string | string[] | Record<string, boolean>;

export interface ExamResult {
  id?: string;
  timestamp: string;
  nama: string;
  noAbsen: string;
  kelas: string;
  tglLahir?: string;
  benar: number;
  salah: number;
  nilai: number;
  status: 'Lulus' | 'Belum Lulus';
  detailJawaban?: Record<number, AnswerValue>;
}

export type AppStage = 1 | 2 | 3 | 4;
