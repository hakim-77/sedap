// src/components/ProdukUnggulan.js
import React, { useState } from 'react'; // Pastikan useState diimpor
import { FaLeaf, FaStar, FaEye, FaHeart, FaShoppingCart } from "react-icons/fa";
// Pastikan path impor produkData benar relatif terhadap file ini
// Jika ProdukUnggulan.js ada di src/components/ dan produk.json di src/data/
import produkData from './produks.json';

// Komponen StarRating
const StarRating = ({ rating = 5, starColor = "text-green-500" }) => {
    const totalStars = 5;
    return (
        <div className={`flex justify-center ${starColor}`}>
            {[...Array(rating)].map((_, index) => (
                <FaStar key={index} className="mx-0.5 text-sm" />
            ))}
            {[...Array(totalStars - rating)].map((_, index) => (
                 <FaStar key={`empty-${index}`} className="mx-0.5 text-gray-300 text-sm" />
            ))}
        </div>
    );
};

// Komponen Kartu Produk Individual
const ProductCard = ({ produk }) => {
    const [isHovered, setIsHovered] = useState(false);
    const imageBgColor = produk.NamaProduk === 'Apples' || produk.NamaProduk === 'Tomatoes' ? 'bg-[#FFF9F5]' : 'bg-[#FDFBF8]';

    return (
        <div
            className="bg-white group relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="h-full flex flex-col">
                <div className={`relative aspect-w-1 aspect-h-1 ${imageBgColor} flex items-center justify-center p-8`}>
                    <img
                        src={produk.ImageUrl}
                        alt={produk.NamaProduk}
                        className="object-contain max-h-36 sm:max-h-40 w-auto transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/300x300?text=No+Image" }}
                    />
                    {produk.IsSale && (
                        <div className="absolute top-3 right-3 bg-gray-800 text-white text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-wider shadow z-10">
                            Sale
                        </div>
                    )}
                    <div
                        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 flex justify-center space-x-2 transition-all duration-300 ease-out z-20
                                    ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
                    >
                        <button title="Quick View" className="bg-green-500 hover:bg-green-600 text-white w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-200">
                            <FaEye size={16} />
                        </button>
                        <button title="Add to Wishlist" className="bg-green-500 hover:bg-green-600 text-white w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-200">
                            <FaHeart size={16} />
                        </button>
                        <button title="Add to Cart" className="bg-green-500 hover:bg-green-600 text-white w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-200">
                            <FaShoppingCart size={16} />
                        </button>
                    </div>
                </div>
                <div className="pt-8 pb-6 px-4 text-center flex-grow relative z-0">
                    <h3
                        className="text-base sm:text-lg font-semibold text-gray-800 mb-2"
                        style={{ fontFamily: "'Merriweather', serif" }}
                    >
                        {produk.NamaProduk}
                    </h3>
                    <div className="mb-2.5">
                        <StarRating rating={produk.Rating || 5} starColor="text-green-500" />
                    </div>
                    <p className="text-gray-400 text-sm sm:text-base">
                        {produk.Harga}
                    </p>
                </div>
            </div>
        </div>
    );
};


export default function ProdukUnggulan() {
    // State untuk kategori aktif
    const [activeCategory, setActiveCategory] = useState('All');
    const categories = ['All', 'Dairy', 'Pantry', 'Meat', 'Fruits', 'Vegetables'];

    // Fungsi untuk filter produk (contoh sederhana, bisa disesuaikan)
    const filteredProducts = activeCategory === 'All'
        ? produkData
        : produkData.filter(produk => produk.Kategori === activeCategory); // Anda perlu menambahkan properti "Kategori" di produk.json

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4">
                 {/* Header Section - DENGAN PERBAIKAN POSISI */}
                 <div className="mb-12 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end relative">
                    {/* Overlay daun di background pojok kanan atas (opsional) */}
                    {/* <FaLeaf className="absolute top-0 right-0 text-[150px] sm:text-[200px] text-gray-100 opacity-30 -z-10 transform translate-x-1/4 -translate-y-1/4" /> */}

                    {/* Kolom Kiri: Judul dan Subjudul */}
                    <div className="text-left mb-8 md:mb-0">
                        <FaLeaf className="text-green-500 text-2xl sm:text-3xl mb-2" />
                        <p className="text-xs sm:text-sm text-gray-400 font-medium tracking-wider uppercase mb-1">
                            Recently Added
                        </p>
                        <h2
                            className="text-4xl sm:text-5xl font-bold text-gray-800"
                            style={{ fontFamily: "'Merriweather', serif" }}
                        >
                            New Products
                        </h2>
                    </div>

                    {/* Kolom Kanan: Filter Kategori */}
                    <div className="flex flex-wrap justify-start md:justify-end space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-500 font-medium">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`pb-1 transition duration-200
                                            ${activeCategory === category
                                                ? 'border-b-2 border-green-500 text-green-500 font-semibold'
                                                : 'border-b-2 border-transparent hover:text-green-500 hover:border-green-300'
                                            }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div> {/* End Header Section */}

                {/* Grid Produk */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Gunakan filteredProducts jika Anda mengimplementasikan filter */}
                    {/* Jika tidak, gunakan produkData seperti sebelumnya */}
                    {filteredProducts && filteredProducts.length > 0 ? (
                        // Mengambil hanya 3 produk pertama untuk demo, atau sesuaikan
                        filteredProducts.slice(0, 10).map((produk) => (
                           <ProductCard key={produk.KodeProduk} produk={produk} />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500 py-10">No products found for this category.</p>
                    )}
                </div>
            </div>
        </section>
    );
}