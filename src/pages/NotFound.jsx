import { Link } from "react-router-dom";

// Komponen SVG sederhana untuk ilustrasi (Anda bisa ganti dengan SVG yang lebih kompleks)
// Sumber SVG bisa dari unDraw, Hero Patterns, dll. atau buat sendiri.
const NotFoundIllustration = () => (
  <svg className="w-40 h-40 sm:w-48 sm:h-48 mx-auto text-green-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.188 13.188a1.874 1.874 0 11-2.651 0 1.874 1.874 0 012.651 0zM8.813 13.188a1.874 1.874 0 11-2.651 0 1.874 1.874 0 012.651 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 10 V9 M15 10 V9" /> {/* Sedikit modifikasi untuk alis 'sedih' */}
  </svg>
);

// Komponen SVG untuk ikon tombol (opsional)
const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
);


export default function NotFound() {
  return (
    // Background Gradien Lembut
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4">
      {/* Kontainer Kartu */}
      <div className="text-center bg-white p-10 sm:p-12 rounded-xl shadow-2xl max-w-lg w-full border border-gray-200 transform transition-all hover:scale-[1.01]">

        {/* Ilustrasi */}
        <NotFoundIllustration />

        {/* Kode Error */}
        <h1 className="text-7xl sm:text-8xl font-extrabold text-red-500 tracking-tight mb-2">
          404
        </h1>

        {/* Judul Halaman */}
        <p className="text-3xl sm:text-4xl font-semibold text-gray-800 mt-4">
          Page Not Found
        </p>

        {/* Pesan Deskriptif */}
        <p className="text-lg text-gray-600 mt-3 max-w-sm mx-auto">
          Oops! Looks like the page you were searching for doesn't exist or has been moved.
        </p>

        {/* Tombol Kembali */}
        <Link
          to="/"
          className="mt-8 inline-flex items-center bg-green-600 text-white px-7 py-3 rounded-lg text-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
        >
          <HomeIcon /> {/* Ikon di tombol */}
          Back To Dashboard
        </Link>
      </div>
    </div>
  );
}