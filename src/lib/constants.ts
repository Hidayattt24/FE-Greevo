import { SlideData } from "@/types";

export const slides: SlideData[] = [
  {
    image: "/assets/welcome/get-started-1.svg",
    title: "Gabung dalam Gerakan Menghijaukan Indonesia bersama Greenvo!",
    description:
      "Greenvo adalah aplikasi yang mengajak seluruh masyarakat Indonesia untuk lebih peduli lingkungan lewat aksi sederhana seperti membuang sampah pada tempatnya, bersepeda, dan membawa tumbler. Aksi kecil, dampak besar untuk bumi kita!",
  },
  {
    image: "/assets/welcome/get-started-2.svg",
    title: "Aksi Nyata untuk Indonesia Lebih Hijau",
    description:
      "Lewat aplikasi Greenvo, kamu bisa foto sampah yang dibuang, rekam jarak saat bersepeda, dan cek penggunaan tumbler. Semua aktivitasmu akan dikonversi jadi XP (poin) yang bisa ditukar reward seru!",
  },
  {
    image: "/assets/welcome/get-started-3.svg",
    title: "Bagikan Aksi & Jadi Inspirasi di Greenvo",
    description:
      "Upload aktivitasmu langsung di aplikasi Greenvo dan lihat aksi ramah lingkungan dari seluruh penjuru Indonesia. Jelajahi feed ala TikTok versi hijau dan jadi bagian dari perubahan bersama komunitas Greenvo!",
  },
];

export const ROUTES = {
  HOME: "/",
  GET_STARTED: "/get-started",
  WELCOME: "/welcome",
} as const;

export const TIMING = {
  SPLASH_DURATION: 2500,
  TRANSITION_DURATION: 500,
  SLIDE_AUTO_DURATION: 5000, // 5 seconds for auto slide transition
} as const;
