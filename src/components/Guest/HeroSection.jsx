import React from 'react';
import { FaUndo, FaShippingFast, FaStore } from "react-icons/fa";

export default function HeroSection() {
    return (
        <>
            {/* SECTION 1: Hero Background & Konten Utama */}
            {/* Pastikan section ini punya position relative agar z-index bekerja */}
            {/* Tinggi bisa disesuaikan, misal h-[75vh] atau h-[80vh] */}
            <section className="relative w-full h-[90vh]">

                {/* Background image & overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/img/main-slider-1-1.jpg')",
                    }}
                >
                    {/* Overlay gelap opsional */}
                    <div className="absolute inset-0 bg-black opacity-30"></div>
                </div>

                {/* Konten Utama (Teks & Tombol) - Centered */}
                {/* Z-index ini harus lebih rendah dari z-index info bar jika overlap */}
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-white text-center px-4">
                    <h2
                        className="text-6xl sm:text-8xl lg:text-[110px] xl:text-[130px] font-bold leading-tight"
                        style={{ fontFamily: "'Abril Fatface'" }}
                    >
                        Organic <br />Food Market
                    </h2>
                    <button className="mt-8 bg-hijau text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300">
                        Order Now
                    </button>
                </div>
            </section>

            {/* SECTION 2: Info Bar (Langsung di bawah, tanpa padding/background section) */}
            {/* Section ini hanya sebagai pembungkus layout */}
                    
        </>
    );
}