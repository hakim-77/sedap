// src/components/Ulasan.js
import React from 'react';
import { FaLeaf } from "react-icons/fa"; // Ikon daun
// Pastikan path impor ulasanData benar relatif terhadap file ini
// Jika Ulasan.js ada di src/components/ dan ulasan.json di src/data/
import ulasanData from './ulasan.json';

// Komponen untuk satu kartu ulasan
const UlasanCard = ({ ulasan }) => {
    // Konstanta untuk membantu menghitung margin (opsional, bisa hardcode mt jika lebih simpel)
    // w-24 h-24 di Tailwind adalah 6rem atau 96px.
    // -top-12 adalah -3rem atau -48px (setengah tinggi gambar)
    // Jadi, kita butuh margin atas pada konten sekitar setengah tinggi gambar + sedikit padding.
    // 3rem (untuk setengah gambar) + 1rem (padding tambahan) = 4rem = mt-16
    // Atau lebih simpel: mt-14 atau mt-16 sudah cukup.

    return (
        // Kartu utama: hapus pt-16, p-6 md:p-8 akan menangani padding internal
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 text-center relative flex flex-col h-full">
            {/* Gambar Profil - diposisikan absolut, tumpang tindih ke atas */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-12 z-10"> {/* z-10 agar gambar di atas konten jika ada overlap tak terduga */}
                <img
                    src={ulasan.gambarUrl || `https://i.pravatar.cc/150?u=${ulasan.id}`}
                    alt={ulasan.nama}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                    onError={(e) => { e.target.onerror = null; e.target.src=`https://i.pravatar.cc/150?u=default${ulasan.id}` }}
                />
            </div>

            {/* Wrapper untuk konten di bawah gambar profil */}
            {/* Diberi margin atas yang cukup (misal mt-14 atau mt-16) */}
            {/* dan flex-grow agar mengisi sisa ruang, mendorong nama/jabatan ke bawah */}
            <div className="mt-14 flex flex-col flex-grow"> {/* mt-14 adalah 3.5rem, cukup untuk mengakomodasi -top-12 (3rem) dari gambar */}
                {/* Teks Ulasan */}
                <p className="text-gray-400 text-sm sm:text-base">
                    "{ulasan.ulasan}"
                </p>

                {/* Nama dan Jabatan */}
                <div className="mt-auto"> {/* Mendorong nama & jabatan ke bawah */}
                    <h4
                        className="text-lg font-semibold text-green-600 mb-1"
                        style={{ fontFamily: "'Merriweather', serif" }}
                    >
                        {ulasan.nama}
                    </h4>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">
                        {ulasan.jabatan}
                    </p>
                </div>
            </div>


            {/* Garis Hijau di Bawah Kartu */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-green-500 rounded-b-lg"></div>
        </div>
    );
};


export default function Ulasan() {
    return (
        <section className="py-16 md:py-24 bg-[#F8F9FA] relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12 md:mb-16">
                    <FaLeaf className="text-green-500 text-3xl mb-2 inline-block" />
                    <p className="text-sm text-gray-500 font-medium tracking-wider uppercase mb-1">
                        Our Testimonials
                    </p>
                    <h2
                        className="text-4xl md:text-5xl font-bold text-gray-800"
                        style={{ fontFamily: "'Merriweather', serif" }}
                    >
                        What People Say?
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {ulasanData && ulasanData.length > 0 ? (
                        ulasanData.map((itemUlasan) => (
                           <UlasanCard key={itemUlasan.id} ulasan={itemUlasan} />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500 py-10">No testimonials found.</p>
                    )}
                </div>
            </div>
        </section>
    );
}