import { Question } from '../types';

export const INITIAL_QUESTIONS: Question[] = [
  // =========================================================================
  // PILIHAN GANDA (15 BUTIR SOAL: NO. 1 - 15)
  // Setiap soal memiliki 4 opsi jawaban (A, B, C, D) dengan 1 jawaban benar.
  // =========================================================================
  {
    id: 1,
    type: 'pg',
    topic: 'Vegetable Identification',
    difficulty: 'Mudah',
    text: 'Look at the picture below! What vegetable is this? It is bright orange, crunchy, and very good for our eyes.\n\n"I love eating fresh orange ________ in my soup."',
    imageSvg: `<svg viewBox="0 0 200 160" class="w-44 h-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="carrotGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#fb923c"/>
          <stop offset="100%" stop-color="#ea580c"/>
        </linearGradient>
      </defs>
      <!-- Leaves -->
      <path d="M100 50 C90 20 65 15 60 25 C65 35 85 45 95 52" fill="#22c55e" stroke="#15803d" stroke-width="2"/>
      <path d="M100 48 C100 10 105 5 110 5 C115 15 105 35 102 50" fill="#16a34a" stroke="#15803d" stroke-width="2"/>
      <path d="M104 52 C120 25 145 20 145 30 C135 42 115 48 106 54" fill="#22c55e" stroke="#15803d" stroke-width="2"/>
      <!-- Body -->
      <path d="M85 55 C82 75 92 135 102 155 C112 135 122 75 119 55 C112 50 92 50 85 55 Z" fill="url(#carrotGrad)" stroke="#c2410c" stroke-width="2.5"/>
      <!-- Texture lines -->
      <line x1="90" y1="75" x2="105" y2="76" stroke="#9a3412" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="98" y1="95" x2="114" y2="96" stroke="#9a3412" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="93" y1="115" x2="107" y2="116" stroke="#9a3412" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="98" y1="133" x2="106" y2="133" stroke="#9a3412" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`,
    options: [
      { id: 'A', text: 'Carrot' },
      { id: 'B', text: 'Eggplant' },
      { id: 'C', text: 'Cucumber' },
      { id: 'D', text: 'Onion' },
    ],
    correctAnswer: 'A',
    explanation: 'Gambar tersebut adalah wortel (Carrot). Ciri-cirinya berwarna oranye cerah, renyah, dan kaya akan Vitamin A yang sangat baik untuk kesehatan mata.',
  },
  {
    id: 2,
    type: 'pg',
    topic: 'Vegetable Characteristics',
    difficulty: 'Mudah',
    text: 'This healthy vegetable looks like a small green tree. It has lots of florets and is packed with Vitamin C and dietary fiber. What is its name in English?',
    imageSvg: `<svg viewBox="0 0 200 160" class="w-44 h-auto" xmlns="http://www.w3.org/2000/svg">
      <!-- Stalk -->
      <path d="M92 90 L88 145 C88 150 112 150 112 145 L108 90 Z" fill="#86efac" stroke="#16a34a" stroke-width="2"/>
      <!-- Florets -->
      <circle cx="80" cy="75" r="24" fill="#22c55e" stroke="#15803d" stroke-width="2"/>
      <circle cx="120" cy="75" r="24" fill="#22c55e" stroke="#15803d" stroke-width="2"/>
      <circle cx="100" cy="55" r="26" fill="#16a34a" stroke="#15803d" stroke-width="2"/>
      <circle cx="65" cy="60" r="18" fill="#15803d"/>
      <circle cx="135" cy="60" r="18" fill="#15803d"/>
      <circle cx="100" cy="40" r="18" fill="#4ade80"/>
    </svg>`,
    options: [
      { id: 'A', text: 'Corn' },
      { id: 'B', text: 'Broccoli' },
      { id: 'C', text: 'Tomato' },
      { id: 'D', text: 'Mushroom' },
    ],
    correctAnswer: 'B',
    explanation: 'Sayuran hijau yang menyerupai pohon kecil dengan kuntum bunga rapat adalah brokoli (Broccoli). Brokoli kaya akan serat dan Vitamin C.',
  },
  {
    id: 3,
    type: 'pg',
    topic: 'Colors of Vegetables',
    difficulty: 'Mudah',
    text: 'Look at the picture! Ripe tomatoes are juicy and have a pleasant sweet-sour taste. What color is a ripe tomato?',
    imageSvg: `<svg viewBox="0 0 200 160" class="w-40 h-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="tomatoGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#f87171"/>
          <stop offset="50%" stop-color="#ef4444"/>
          <stop offset="100%" stop-color="#b91c1c"/>
        </radialGradient>
      </defs>
      <!-- Calyx/Stem -->
      <path d="M100 48 L98 25 C98 22 104 22 104 25 L102 48" fill="#15803d" stroke="#14532d" stroke-width="2"/>
      <path d="M100 48 C90 40 75 42 70 46 C80 50 92 50 98 52" fill="#22c55e"/>
      <path d="M102 48 C112 40 127 42 132 46 C122 50 110 50 104 52" fill="#22c55e"/>
      <path d="M100 52 C100 62 100 66 100 66" stroke="#15803d" stroke-width="3"/>
      <!-- Body -->
      <ellipse cx="100" cy="95" rx="50" ry="46" fill="url(#tomatoGrad)" stroke="#991b1b" stroke-width="2.5"/>
      <!-- Highlight -->
      <ellipse cx="80" cy="78" rx="14" ry="8" fill="#fecaca" opacity="0.6" transform="rotate(-25 80 78)"/>
    </svg>`,
    options: [
      { id: 'A', text: 'Blue' },
      { id: 'B', text: 'Yellow' },
      { id: 'C', text: 'Red' },
      { id: 'D', text: 'Black' },
    ],
    correctAnswer: 'C',
    explanation: 'Tomat yang sudah matang (ripe tomato) berwarna merah (Red).',
  },
  {
    id: 4,
    type: 'pg',
    topic: 'Vegetable Identification',
    difficulty: 'Mudah',
    text: 'Look at the picture! This glossy vegetable has a smooth purple skin and green cap. In Indonesian it is called "terung". What is it in English?',
    imageSvg: `<svg viewBox="0 0 200 160" class="w-40 h-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="eggplantGrad" cx="35%" cy="40%" r="65%">
          <stop offset="0%" stop-color="#a855f7"/>
          <stop offset="50%" stop-color="#7e22ce"/>
          <stop offset="100%" stop-color="#3b0764"/>
        </radialGradient>
      </defs>
      <!-- Cap/Calyx -->
      <path d="M100 35 L100 18" stroke="#15803d" stroke-width="5" stroke-linecap="round"/>
      <path d="M78 50 C85 40 115 40 122 50 C115 58 118 64 120 66 C105 58 95 58 80 66 C82 64 85 58 78 50 Z" fill="#22c55e" stroke="#16a34a" stroke-width="1.5"/>
      <!-- Body -->
      <path d="M85 55 C70 85 72 135 98 145 C124 135 128 85 115 55 Z" fill="url(#eggplantGrad)" stroke="#2e1065" stroke-width="2"/>
      <ellipse cx="88" cy="85" rx="6" ry="16" fill="#d8b4fe" opacity="0.4" transform="rotate(-15 88 85)"/>
    </svg>`,
    options: [
      { id: 'A', text: 'Eggplant' },
      { id: 'B', text: 'Cabbage' },
      { id: 'C', text: 'Potato' },
      { id: 'D', text: 'Chili' },
    ],
    correctAnswer: 'A',
    explanation: 'Terung dalam bahasa Inggris adalah Eggplant (atau aubergine). Warnanya khas ungu mengilap dengan kelopak hijau di atasnya.',
  },
  {
    id: 5,
    type: 'pg',
    topic: 'Health Benefits',
    difficulty: 'Sedang',
    text: 'Spinach (bayam) is a nutritious dark green leafy vegetable. Why is eating spinach good for our health?',
    options: [
      { id: 'A', text: 'It makes our teeth dirty and weak' },
      { id: 'B', text: 'It contains iron and vitamins to make our body strong and fit' },
      { id: 'C', text: 'It contains too much artificial sugar' },
      { id: 'D', text: 'It makes people feel sleepy and tired all day' },
    ],
    correctAnswer: 'B',
    explanation: 'Bayam (spinach) kaya akan zat besi (iron) dan vitamin yang membantu pembentukan sel darah merah serta menjaga stamina tubuh agar tetap kuat dan bugar.',
  },
  {
    id: 6,
    type: 'pg',
    topic: 'Daily Conversation',
    difficulty: 'Mudah',
    text: 'Read the short dialogue:\nSarah: "What is your favorite vegetable, Made?"\nMade: "I really like ________ because it is long, green, and very refreshing when eaten fresh with rice."',
    imageSvg: `<svg viewBox="0 0 200 140" class="w-40 h-auto" xmlns="http://www.w3.org/2000/svg">
      <!-- Cucumber -->
      <rect x="40" y="45" width="120" height="45" rx="22" fill="#4ade80" stroke="#16a34a" stroke-width="2.5" transform="rotate(-10 100 70)"/>
      <ellipse cx="60" cy="62" rx="4" ry="2" fill="#15803d"/>
      <ellipse cx="95" cy="55" rx="4" ry="2" fill="#15803d"/>
      <ellipse cx="130" cy="50" rx="4" ry="2" fill="#15803d"/>
      <ellipse cx="80" cy="75" rx="4" ry="2" fill="#15803d"/>
      <ellipse cx="115" cy="70" rx="4" ry="2" fill="#15803d"/>
    </svg>`,
    options: [
      { id: 'A', text: 'cucumber' },
      { id: 'B', text: 'chili' },
      { id: 'C', text: 'candy' },
      { id: 'D', text: 'ice cream' },
    ],
    correctAnswer: 'A',
    explanation: 'Sayuran yang panjang, berwarna hijau, berair, dan sangat segar dimakan langsung sebagai lalapan atau salad adalah timun (cucumber).',
  },
  {
    id: 7,
    type: 'pg',
    topic: 'Grammar in Context',
    difficulty: 'Sedang',
    text: 'Choose the correct verb form to complete the sentence:\n\n"Every morning, Kadek ________ (like) eating fresh vegetable salad with tomatoes and lettuces."',
    options: [
      { id: 'A', text: 'likes' },
      { id: 'B', text: 'like' },
      { id: 'C', text: 'liking' },
      { id: 'D', text: 'is like' },
    ],
    correctAnswer: 'A',
    explanation: 'Subjek "Kadek" adalah kata ganti orang ketiga tunggal (he/she), sehingga dalam Simple Present Tense kata kerja ditambah akhiran -s, menjadi "likes".',
  },
  {
    id: 8,
    type: 'pg',
    topic: 'Vegetable Taste & Senses',
    difficulty: 'Mudah',
    text: 'Chilies (cabai) are often added to traditional Indonesian dishes like sambal. How does a fresh red chili taste?',
    options: [
      { id: 'A', text: 'Spicy and hot' },
      { id: 'B', text: 'Sweet like sugar' },
      { id: 'C', text: 'Salty like sea water' },
      { id: 'D', text: 'Sour like vinegar' },
    ],
    correctAnswer: 'A',
    explanation: 'Cabai (chili) memiliki rasa pedas dan panas (spicy and hot) karena mengandung zat capsaicin.',
  },
  {
    id: 9,
    type: 'pg',
    topic: 'Reading Comprehension',
    difficulty: 'Sedang',
    text: 'Read the short text:\n"On Sunday morning, Putu helps his mother in the kitchen. They are preparing a delicious bowl of chicken soup. Mother slices carrots, cabbage, and potatoes. Putu washes the celery and green beans with clean running water."\n\nQuestion: What vegetables are sliced for the chicken soup?',
    options: [
      { id: 'A', text: 'Apples, oranges, and bananas' },
      { id: 'B', text: 'Carrots, cabbage, and potatoes' },
      { id: 'C', text: 'Candies and chocolates' },
      { id: 'D', text: 'Bread and cheese' },
    ],
    correctAnswer: 'B',
    explanation: 'Berdasarkan teks bacaan: "Mother slices carrots, cabbage, and potatoes" (Ibu mengiris wortel, kubis, dan kentang).',
  },
  {
    id: 10,
    type: 'pg',
    topic: 'Nutrition & Vitamins',
    difficulty: 'Sedang',
    text: 'Carrots contain lots of beta-carotene which our body turns into a special vitamin for healthy eyes. Which vitamin is it?',
    options: [
      { id: 'A', text: 'Vitamin D' },
      { id: 'B', text: 'Vitamin A' },
      { id: 'C', text: 'Vitamin K' },
      { id: 'D', text: 'Vitamin B12' },
    ],
    correctAnswer: 'B',
    explanation: 'Wortel sangat kaya akan Vitamin A (dari beta-karoten) yang bermanfaat menjaga kejernihan dan kesehatan organ penglihatan / mata (healthy eyesight).',
  },
  {
    id: 11,
    type: 'pg',
    topic: 'Singular & Plural Nouns',
    difficulty: 'Sedang',
    text: 'Choose the correct plural form of the vegetable in parentheses:\n\n"Mother bought two bags of (potato) ________ at the traditional market yesterday."',
    options: [
      { id: 'A', text: 'potatos' },
      { id: 'B', text: 'potatoes' },
      { id: 'C', text: 'potatoss' },
      { id: 'D', text: 'potatoeses' },
    ],
    correctAnswer: 'B',
    explanation: 'Bentuk jamak (plural) dari kata benda "potato" yang berakhiran huruf konsonan + "o" adalah ditambah akhiran "-es", yaitu "potatoes".',
  },
  {
    id: 12,
    type: 'pg',
    topic: 'Vegetable Seasoning',
    difficulty: 'Mudah',
    text: 'Look at the picture! Garlic and onions are bulb vegetables widely used as aromatics in cooking. What is "garlic" in Indonesian?',
    imageSvg: `<svg viewBox="0 0 200 150" class="w-40 h-auto" xmlns="http://www.w3.org/2000/svg">
      <!-- Garlic Bulb -->
      <path d="M100 40 C85 45 65 65 65 95 C65 125 90 135 100 135 C110 135 135 125 135 95 C135 65 115 45 100 40 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2.5"/>
      <path d="M100 40 L98 25 C98 22 102 22 102 25 L100 40" stroke="#a1a1aa" stroke-width="3" stroke-linecap="round"/>
      <path d="M85 55 C80 75 80 115 90 130" stroke="#cbd5e1" stroke-width="1.8" fill="none"/>
      <path d="M115 55 C120 75 120 115 110 130" stroke="#cbd5e1" stroke-width="1.8" fill="none"/>
      <line x1="100" y1="42" x2="100" y2="134" stroke="#cbd5e1" stroke-width="1.8"/>
    </svg>`,
    options: [
      { id: 'A', text: 'Bawang merah' },
      { id: 'B', text: 'Bawang putih' },
      { id: 'C', text: 'Bawang bombay' },
      { id: 'D', text: 'Daun bawang' },
    ],
    correctAnswer: 'B',
    explanation: 'Garlic artinya adalah bawang putih, sedangkan onion adalah bawang bombay / bawang merah.',
  },
  {
    id: 13,
    type: 'pg',
    topic: 'Vegetable Identification',
    difficulty: 'Mudah',
    text: 'What is the English word for "labu kuning" (a big round orange vegetable often carved at Halloween and cooked into sweet soup)?',
    imageSvg: `<svg viewBox="0 0 200 150" class="w-40 h-auto" xmlns="http://www.w3.org/2000/svg">
      <!-- Pumpkin Stem -->
      <path d="M100 35 C98 15 110 12 112 18 C110 28 104 35 102 38" fill="#15803d" stroke="#14532d" stroke-width="1.5"/>
      <!-- Pumpkin Segments -->
      <ellipse cx="65" cy="85" rx="30" ry="42" fill="#ea580c"/>
      <ellipse cx="135" cy="85" rx="30" ry="42" fill="#ea580c"/>
      <ellipse cx="80" cy="85" rx="30" ry="45" fill="#f97316"/>
      <ellipse cx="120" cy="85" rx="30" ry="45" fill="#f97316"/>
      <ellipse cx="100" cy="86" rx="28" ry="46" fill="#fb923c" stroke="#c2410c" stroke-width="1.5"/>
    </svg>`,
    options: [
      { id: 'A', text: 'Watermelon' },
      { id: 'B', text: 'Pumpkin' },
      { id: 'C', text: 'Papaya' },
      { id: 'D', text: 'Pineapple' },
    ],
    correctAnswer: 'B',
    explanation: 'Labu kuning dalam bahasa Inggris adalah Pumpkin.',
  },
  {
    id: 14,
    type: 'pg',
    topic: 'Healthy Habits',
    difficulty: 'Sedang',
    text: 'What should we always do to fresh vegetables BEFORE eating or cooking them?',
    options: [
      { id: 'A', text: 'Wash them thoroughly under clean running water' },
      { id: 'B', text: 'Paint them with artificial coloring' },
      { id: 'C', text: 'Leave them under the hot sun for two days' },
      { id: 'D', text: 'Dip them into sugary soft drink' },
    ],
    correctAnswer: 'A',
    explanation: 'Sebelum dimasak atau dikonsumsi, sayuran segar harus dicuci bersih dengan air mengalir (wash under clean running water) untuk menghilangkan sisa kotoran dan debu.',
  },
  {
    id: 15,
    type: 'pg',
    topic: 'Nutrition & Health',
    difficulty: 'Mudah',
    text: 'Complete the sentence:\n\n"Vegetables contain plenty of ________ which is very helpful for our digestive system (pencernaan lancar)."',
    options: [
      { id: 'A', text: 'plastic' },
      { id: 'B', text: 'dietary fiber' },
      { id: 'C', text: 'white sugar' },
      { id: 'D', text: 'cooking smoke' },
    ],
    correctAnswer: 'B',
    explanation: 'Sayuran kaya akan serat pangan (dietary fiber) yang berperan penting dalam menjaga kelancaran saluran pencernaan tubuh kita.',
  },

  // =========================================================================
  // PILIHAN GANDA KOMPLEKS (5 BUTIR SOAL: NO. 16 - 20)
  // Siswa dapat memilih LEBIH DARI SATU jawaban yang benar.
  // =========================================================================
  {
    id: 16,
    type: 'pgk',
    topic: 'Green Vegetables',
    difficulty: 'Sedang',
    text: 'Which of the following vegetables are naturally GREEN in color? (Pilihlah semua jawaban yang benar!)',
    options: [
      { id: 'A', text: 'Spinach (bayam)' },
      { id: 'B', text: 'Broccoli (brokoli)' },
      { id: 'C', text: 'Ripe carrot (wortel matang)' },
      { id: 'D', text: 'Cucumber (mentimun)' },
    ],
    correctAnswer: ['A', 'B', 'D'],
    explanation: 'Spinach (bayam), Broccoli (brokoli), dan Cucumber (mentimun) adalah sayuran berwarna hijau. Sedangkan wortel (carrot) berwarna oranye.',
  },
  {
    id: 17,
    type: 'pgk',
    topic: 'Healthy Food Categories',
    difficulty: 'Mudah',
    text: 'Which of the following items are HEALTHY FRESH VEGETABLES? (Pilihlah seluruh pilihan yang termasuk sayuran segar dan menyehatkan!)',
    options: [
      { id: 'A', text: 'Cabbage (kubis/kol)' },
      { id: 'B', text: 'French fries with too much oily salt' },
      { id: 'C', text: 'Fresh tomato (tomat segar)' },
      { id: 'D', text: 'Eggplant (terung)' },
    ],
    correctAnswer: ['A', 'C', 'D'],
    explanation: 'Cabbage, fresh tomato, dan eggplant adalah sayuran segar dan menyehatkan. French fries yang berminyak dan asin termasuk junk food gorengan.',
  },
  {
    id: 18,
    type: 'pgk',
    topic: 'Health Benefits',
    difficulty: 'Sedang',
    text: 'What are the true health benefits of eating vegetables every day? (Pilihlah semua manfaat kesehatan dari rajin makan sayur!)',
    options: [
      { id: 'A', text: 'Boosts our immune system so we do not get sick easily' },
      { id: 'B', text: 'Provides essential vitamins and minerals for active body' },
      { id: 'C', text: 'Causes severe tooth decay and high blood sugar' },
      { id: 'D', text: 'Helps maintain good eye vision and smooth digestion' },
    ],
    correctAnswer: ['A', 'B', 'D'],
    explanation: 'Manfaat makan sayuran: meningkatkan daya tahan tubuh (immune system), menyuplai vitamin & mineral, serta menjaga kesehatan mata dan pencernaan. Sayuran tidak menyebabkan kerusakan gigi atau gula tinggi.',
  },
  {
    id: 19,
    type: 'pgk',
    topic: 'Raw Vegetables (Salad & Lalapan)',
    difficulty: 'Sedang',
    text: 'Which of the following vegetables can be eaten raw (mentah) as a fresh salad or traditional Indonesian lalapan after being washed? (Pilihlah semua yang bisa dimakan segar!)',
    options: [
      { id: 'A', text: 'Cucumber (mentimun)' },
      { id: 'B', text: 'Lettuce (selada)' },
      { id: 'C', text: 'Fresh tomato (tomat segar)' },
      { id: 'D', text: 'Raw hard cassava/tuber (singkong mentah keras)' },
    ],
    correctAnswer: ['A', 'B', 'C'],
    explanation: 'Mentimun, selada (lettuce), dan tomat segar biasa dikonsumsi mentah dalam salad maupun lalapan. Singkong mentah bergetah tidak boleh dimakan mentah.',
  },
  {
    id: 20,
    type: 'pgk',
    topic: 'Healthy Vegetable Habits',
    difficulty: 'Sedang',
    text: 'Which sentences show GOOD and HEALTHY habits regarding vegetables? (Pilihlah kebiasaan yang baik dan sehat!)',
    options: [
      { id: 'A', text: 'Washing vegetables with clean water before cutting and cooking them' },
      { id: 'B', text: 'Adding colorful vegetables like carrots and green beans to daily meals' },
      { id: 'C', text: 'Refusing all vegetables and only eating instant noodles every day' },
      { id: 'D', text: 'Keeping fresh vegetables in the refrigerator to keep them crisp' },
    ],
    correctAnswer: ['A', 'B', 'D'],
    explanation: 'Kebiasaan sehat mencakup mencuci sayuran sebelum dimasak, menambahkan sayuran beraneka warna ke piring makan, dan menyimpannya di kulkas agar tetap segar.',
  },

  // =========================================================================
  // PILIHAN GANDA KOMPLEKS KATEGORI (5 BUTIR SOAL: NO. 21 - 25)
  // Menilai 3 pernyataan dengan opsi: Benar/Salah, Setuju/Tidak Setuju, Sesuai/Tidak Sesuai.
  // =========================================================================
  {
    id: 21,
    type: 'pgk_kategori',
    topic: 'Characteristics of Vegetables',
    difficulty: 'Sedang',
    categoryType: 'benar_salah',
    text: 'Tentukan pilihan BENAR atau SALAH untuk setiap pernyataan mengenai sayuran berikut ini:',
    statements: [
      {
        id: 's1',
        text: 'Carrots grow underground as root vegetables and are rich in Vitamin A.',
        correctAnswer: true,
        trueLabel: 'BENAR',
        falseLabel: 'SALAH',
      },
      {
        id: 's2',
        text: 'Eggplants (terung) are naturally bright blue like the sea water.',
        correctAnswer: false,
        trueLabel: 'BENAR',
        falseLabel: 'SALAH',
      },
      {
        id: 's3',
        text: 'Broccoli looks like a miniature green tree and contains lots of fiber.',
        correctAnswer: true,
        trueLabel: 'BENAR',
        falseLabel: 'SALAH',
      },
    ],
    explanation: 'Pernyataan 1 BENAR (wortel adalah umbi akar kaya Vitamin A). Pernyataan 2 SALAH (terung berwarna ungu, bukan biru terang). Pernyataan 3 BENAR (brokoli menyerupai pohon kecil hijau dan tinggi serat).',
  },
  {
    id: 22,
    type: 'pgk_kategori',
    topic: 'Healthy Eating Opinions',
    difficulty: 'Sedang',
    categoryType: 'setuju_tidak',
    text: 'Tentukan pilihan SETUJU atau TIDAK SETUJU untuk setiap pernyataan pola makan sehat berikut ini:',
    statements: [
      {
        id: 's1',
        text: 'Fifth-grade elementary school students should eat vegetables every day to stay energetic and healthy.',
        correctAnswer: true,
        trueLabel: 'SETUJU',
        falseLabel: 'TIDAK SETUJU',
      },
      {
        id: 's2',
        text: 'Instant junk food with no vegetables is much better for our body than warm vegetable soup.',
        correctAnswer: false,
        trueLabel: 'SETUJU',
        falseLabel: 'TIDAK SETUJU',
      },
      {
        id: 's3',
        text: 'Eating colorful vegetables (green, orange, red, and purple) provides a variety of beneficial vitamins.',
        correctAnswer: true,
        trueLabel: 'SETUJU',
        falseLabel: 'TIDAK SETUJU',
      },
    ],
    explanation: 'Pernyataan 1 SETUJU (anak kelas 5 SD butuh gizi sayuran setiap hari). Pernyataan 2 TIDAK SETUJU (makanan cepat saji tanpa sayur tidak lebih sehat daripada sayur sop). Pernyataan 3 SETUJU (sayuran beraneka warna memberi kombinasi vitamin berbeda).',
  },
  {
    id: 23,
    type: 'pgk_kategori',
    topic: 'Reading Passage Verification',
    difficulty: 'Sedang',
    categoryType: 'sesuai_tidak',
    text: 'Read the short story:\n"Ayu loves gardening in her backyard. She grows sweet baby carrots, juicy red tomatoes, and fresh green spinach. Every morning before school, she waters the vegetable plants with clean water. Her grandmother often harvests the spinach to make delicious clear soup (sayur bening)."\n\nTentukan apakah pernyataan di bawah ini SESUAI atau TIDAK SESUAI dengan teks bacaan di atas:',
    statements: [
      {
        id: 's1',
        text: 'Ayu grows sweet baby carrots, juicy red tomatoes, and fresh green spinach in her backyard.',
        correctAnswer: true,
        trueLabel: 'SESUAI',
        falseLabel: 'TIDAK SESUAI',
      },
      {
        id: 's2',
        text: 'Ayu waters her vegetable plants with hot tea every evening.',
        correctAnswer: false,
        trueLabel: 'SESUAI',
        falseLabel: 'TIDAK SESUAI',
      },
      {
        id: 's3',
        text: 'Grandmother harvests the spinach to make delicious clear soup (sayur bening).',
        correctAnswer: true,
        trueLabel: 'SESUAI',
        falseLabel: 'TIDAK SESUAI',
      },
    ],
    explanation: 'Pernyataan 1 SESUAI dengan teks. Pernyataan 2 TIDAK SESUAI (Ayu menyiram dengan air bersih setiap pagi, bukan teh panas di malam hari). Pernyataan 3 SESUAI dengan teks.',
  },
  {
    id: 24,
    type: 'pgk_kategori',
    topic: 'Plant Parts We Eat',
    difficulty: 'Sukar',
    categoryType: 'benar_salah',
    text: 'Tentukan pilihan BENAR atau SALAH mengenai bagian tumbuhan yang kita santap sebagai sayuran berikut:',
    statements: [
      {
        id: 's1',
        text: 'Spinach (bayam) and cabbage (kubis) are vegetables where we eat the green leaves (daun).',
        correctAnswer: true,
        trueLabel: 'BENAR',
        falseLabel: 'SALAH',
      },
      {
        id: 's2',
        text: 'Carrots and radishes are root vegetables (sayuran akar/umbi) that develop underground.',
        correctAnswer: true,
        trueLabel: 'BENAR',
        falseLabel: 'SALAH',
      },
      {
        id: 's3',
        text: 'Garlic and onions are the colorful sweet flowers of the vegetable plant.',
        correctAnswer: false,
        trueLabel: 'BENAR',
        falseLabel: 'SALAH',
      },
    ],
    explanation: 'Pernyataan 1 BENAR (bayam dan kubis adalah sayuran daun). Pernyataan 2 BENAR (wortel dan lobak adalah sayuran umbi akar). Pernyataan 3 SALAH (bawang putih dan bawang bombay adalah umbi lapis/bulb, bukan bunga manis).',
  },
  {
    id: 25,
    type: 'pgk_kategori',
    topic: 'Vegetable Freshness & Safety',
    difficulty: 'Sedang',
    categoryType: 'sesuai_tidak',
    text: 'Tentukan apakah pernyataan mengenai cara menyimpan dan mengonsumsi sayuran berikut SESUAI atau TIDAK SESUAI dengan prinsip kebersihan:',
    statements: [
      {
        id: 's1',
        text: 'Fresh vegetables should be kept in a clean refrigerator vegetable compartment to maintain their crispness.',
        correctAnswer: true,
        trueLabel: 'SESUAI',
        falseLabel: 'TIDAK SESUAI',
      },
      {
        id: 's2',
        text: 'Rotten vegetables with dark slime and bad odor are safe to eat raw without washing.',
        correctAnswer: false,
        trueLabel: 'SESUAI',
        falseLabel: 'TIDAK SESUAI',
      },
      {
        id: 's3',
        text: 'Vegetable dishes like soup or capcay are best enjoyed warm and freshly prepared.',
        correctAnswer: true,
        trueLabel: 'SESUAI',
        falseLabel: 'TIDAK SESUAI',
      },
    ],
    explanation: 'Pernyataan 1 SESUAI (sayuran disimpan di kulkas agar renyah). Pernyataan 2 TIDAK SESUAI (sayuran busuk dan berlendir berbahaya bagi kesehatan). Pernyataan 3 SESUAI (sayur sop dan capcay nikmat disantap hangat dan segar).',
  },

  // =========================================================================
  // ISIAN SINGKAT (5 BUTIR SOAL: NO. 26 - 30)
  // Siswa mengetikkan jawaban singkat berupa kata atau frasa dalam bahasa Inggris / Indonesia sesuai petunjuk.
  // =========================================================================
  {
    id: 26,
    type: 'isian',
    topic: 'Vegetable Riddle',
    difficulty: 'Mudah',
    text: 'Read the riddle and type your answer in English:\n\n"I am an orange and crunchy vegetable. Rabbits love to eat me, and I contain Vitamin A to keep your eyesight clear. What vegetable am I?"\n\n(Tuliskan satu kata nama sayuran dalam Bahasa Inggris!)',
    imageSvg: `<svg viewBox="0 0 160 120" class="w-32 h-auto" xmlns="http://www.w3.org/2000/svg">
      <path d="M80 35 C70 12 55 10 50 16 C55 24 68 30 76 36" fill="#22c55e" stroke="#15803d" stroke-width="1.5"/>
      <path d="M80 34 C80 8 84 5 88 5 C92 12 84 25 82 35" fill="#16a34a" stroke="#15803d" stroke-width="1.5"/>
      <path d="M83 36 C95 16 112 12 112 20 C105 28 90 32 84 38" fill="#22c55e" stroke="#15803d" stroke-width="1.5"/>
      <path d="M68 38 C65 55 72 105 80 118 C88 105 95 55 92 38 Z" fill="#f97316" stroke="#c2410c" stroke-width="2"/>
    </svg>`,
    correctAnswer: 'carrot',
    acceptedAnswers: ['carrot', 'carrots', 'a carrot'],
    explanation: 'Sayuran oranye renyah kesukaan kelinci dan kaya Vitamin A adalah wortel (Carrot).',
  },
  {
    id: 27,
    type: 'isian',
    topic: 'Vegetable Name',
    difficulty: 'Mudah',
    text: 'Look at the description and type your answer in English:\n\n"This juicy red vegetable is round and often sliced into hamburgers, sandwiches, or blended into healthy red juice. What is its English name?"\n\n(Tuliskan nama sayuran tersebut dalam Bahasa Inggris!)',
    imageSvg: `<svg viewBox="0 0 160 120" class="w-32 h-auto" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="80" cy="70" rx="42" ry="38" fill="#ef4444" stroke="#b91c1c" stroke-width="2"/>
      <path d="M80 34 L78 18 L82 18 Z" fill="#15803d"/>
      <path d="M80 34 C72 28 62 30 58 32 C65 35 74 35 78 36" fill="#22c55e"/>
      <path d="M80 34 C88 28 98 30 102 32 C95 35 86 35 82 36" fill="#22c55e"/>
    </svg>`,
    correctAnswer: 'tomato',
    acceptedAnswers: ['tomato', 'tomatoes', 'a tomato'],
    explanation: 'Sayuran merah bulat berair yang sering dibuat saus atau jus adalah tomat (Tomato).',
  },
  {
    id: 28,
    type: 'isian',
    topic: 'Vocabulary Completion',
    difficulty: 'Sedang',
    text: 'Complete the sentence with the correct English vegetable name:\n\n"The cartoon sailor Popeye becomes super strong whenever he eats a can of green ________ (bayam)."\n\n(Ketikkan nama bahasa Inggris dari bayam!)',
    correctAnswer: 'spinach',
    acceptedAnswers: ['spinach'],
    explanation: 'Bayam dalam bahasa Inggris adalah Spinach.',
  },
  {
    id: 29,
    type: 'isian',
    topic: 'Vegetable Identification',
    difficulty: 'Mudah',
    text: 'Read the clue and type your answer in English:\n\n"Mashed potatoes and French fries are made from this round, brown-skinned root vegetable. In English, it is called ________."\n\n(Ketikkan kata nama sayuran kentang dalam Bahasa Inggris!)',
    imageSvg: `<svg viewBox="0 0 160 120" class="w-32 h-auto" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="80" cy="65" rx="46" ry="34" fill="#d97706" stroke="#92400e" stroke-width="2" transform="rotate(-5 80 65)"/>
      <circle cx="65" cy="55" r="2.5" fill="#78350f"/>
      <circle cx="95" cy="52" r="2" fill="#78350f"/>
      <circle cx="75" cy="78" r="2.5" fill="#78350f"/>
      <circle cx="105" cy="72" r="2" fill="#78350f"/>
    </svg>`,
    correctAnswer: 'potato',
    acceptedAnswers: ['potato', 'potatoes', 'a potato'],
    explanation: 'Kentang dalam bahasa Inggris adalah Potato.',
  },
  {
    id: 30,
    type: 'isian',
    topic: 'Translation & Vocabulary',
    difficulty: 'Mudah',
    text: 'What is the Indonesian word for the English vegetable "Cabbage"?\n\n(Tuliskan nama sayuran ini dalam Bahasa Indonesia!)',
    correctAnswer: 'kubis',
    acceptedAnswers: ['kubis', 'kol', 'sayur kubis', 'sayur kol'],
    explanation: 'Kata "Cabbage" dalam bahasa Indonesia berarti Kubis atau Kol.',
  },
];
