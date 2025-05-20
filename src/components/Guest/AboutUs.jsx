// Bagian atas file Anda (import dan section Hero, InfoBar tetap sama)
import React from 'react';
import { FaUndo, FaShippingFast, FaStore, FaLeaf, FaCheckCircle } from "react-icons/fa";

export default function CombinedSections() { // Atau nama komponen Anda
    return (
        <>
            {/* ... (SECTION Hero & SECTION Info Bar seperti sebelumnya) ... */}
            <section className="relative">
                <div className="w-full max-w-4xl lg:max-w-5xl mx-auto px-4">
                    <div className="bg-white shadow-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:divide-x md:divide-gray-200 relative z-10 mt-[-60px]">
                        <div className="flex items-center justify-center md:justify-start p-3 md:px-6 space-x-4">
                            <FaUndo className="text-hijau text-4xl flex-shrink-0" />
                            <div className="text-left">
                                <h3 className="font-semibold text-gray-800">Return Policy</h3>
                                <p className="text-sm text-gray-500">Money back guarantee</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center md:justify-start p-3 md:px-6 space-x-4">
                            <FaShippingFast className="text-hijau text-4xl flex-shrink-0" />
                            <div className="text-left">
                                <h3 className="font-semibold text-gray-800">Free Shipping</h3>
                                <p className="text-sm text-gray-500">On all orders over $25.00</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center md:justify-start p-3 md:px-6 space-x-4">
                            <FaStore className="text-hijau text-4xl flex-shrink-0" />
                            <div className="text-left">
                                <h3 className="font-semibold text-gray-800">Store Locator</h3>
                                <p className="text-sm text-gray-500">Find your nearest store</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================== */}
            {/* SECTION 3: About Us                      */}
            {/* =========================================== */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">

                        {/* Kolom Kiri: Gambar - DIPERBARUI */}
                        <div className="relative"> {/* Tambahkan relative untuk positioning overlay daun jika diperlukan */}
                            <div className="flex gap-3 sm:gap-4"> {/* Gunakan flex untuk menyusun gambar berdampingan */}
                                {/* Gambar Kanan (Sayuran) */}
                                <div className="col-md-12 col-lg-6"> {/* Margin atas untuk offset ke bawah */}
                                    <img
                                        src="public/img/about-1-1.png" // GANTI DENGAN PATH GAMBAR SAYURAN ANDA
                                        alt="Vegetables in a basket"
                                        className="img-fluid"
                                    />
                                </div>
                            </div>
                            {/* Placeholder untuk overlay daun jika Anda punya gambarnya */}
                            {/* <img
                                src="/img/leaf-overlay-transparent.png" // GANTI DENGAN PATH OVERLAY DAUN ANDA (PNG transparan)
                                alt=""
                                className="absolute bottom-[-20px] left-[-20px] w-[150px] h-auto opacity-70 z-10 pointer-events-none"
                            /> */}
                        </div>


                        {/* Kolom Kanan: Teks (Tetap sama seperti sebelumnya) */}
                        <div className="text-left">
                            <FaLeaf className="text-hijau text-2xl mb-2" />
                            <p className="text-sm text-gray-500 font-medium tracking-wider uppercase mb-1">
                                Get to Know
                            </p>
                            <h2
                                className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
                                style={{ fontFamily: "'Merriweather', serif" }}
                            >
                                We're Selling Quality Products
                            </h2>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                There are many variations of passages of available but the
                                majority have suffered alteration in some form, by injected
                                humour or words even slightly believable.
                            </p>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                There are many variations of passages of available but the
                                majority have suffered alteration in some form, by injected
                                humour or words even slightly believable.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                                <div className="flex items-start space-x-3">
                                    <FaCheckCircle className="text-hijau text-xl mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">Magnis Dis Nascet</h4>
                                        <p className="text-sm text-gray-500">Lorem ipsum is free do sit</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <FaCheckCircle className="text-hijau text-xl mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">Libero id Ege</h4>
                                        <p className="text-sm text-gray-500">Lorem ipsum is free do sit</p>
                                    </div>
                                </div>
                            </div>
                        </div> {/* End Kolom Kanan */}
                    </div> {/* End Grid Utama */}
                </div> {/* End Container */}
            </section> {/* End About Us Section */}
        </>
    );
}