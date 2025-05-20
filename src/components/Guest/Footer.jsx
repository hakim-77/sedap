// src/components/Footer.js
import React from 'react';
// Import ikon yang relevan
import { FaLeaf, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaTwitter, FaFacebookF, FaInstagram, FaChevronUp } from "react-icons/fa";
import Logo from './Logo';

// Komponen Logo (sama seperti sebelumnya)
const FooterLogo = () => {
    return (
        <div className="flex items-center mb-4">
            <Logo/>
        </div>
    );
};

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        // Warna background: bg-gray-800 (abu-abu gelap) atau bisa diganti dengan hex code misal bg-[#333333] atau bg-[#2D2D2D]
        <footer className="bg-[#2D2D2D] text-gray-400 py-16 md:py-20 relative">
            {/* Background pattern seperti di gambar */}
            <div
                className="absolute inset-0 opacity-[0.03] sm:opacity-[0.04]" // Opasitas sangat rendah
                style={{
                    backgroundImage: "url('/img/footer-food-pattern.png')", // GANTI DENGAN PATH PATTERN ANDA
                    backgroundRepeat: 'repeat',
                    backgroundSize: 'auto', // Atau '300px' atau ukuran yang sesuai dengan pattern Anda
                }}
            ></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Grid Utama Footer - Sesuaikan col-span */}
                {/* Total 12 kolom grid agar lebih fleksibel */}
                <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-8 mb-10 md:mb-12">

                    {/* Kolom 1: Logo dan Deskripsi (Lebih Lebar) */}
                    {/* Mengambil 4/12 atau 1/3 dari lebar di lg */}
                    <div className="md:col-span-3 lg:col-span-4">
                        <FooterLogo />
                        <p className="text-sm leading-relaxed"> {/* Hapus mb-4 jika tidak perlu spasi ekstra */}
                            Atiam rhoncus sit amet adip scing sed ipsum. Lorem ipsum dolor sit amet adipisc sem neque.
                        </p>
                    </div>

                    {/* Kolom 2: Contact (Lebar sekitar 2/12) */}
                    <div className="md:col-span-3 lg:col-span-2">
                        <h5 className="text-white text-base sm:text-lg font-semibold mb-4">Contact</h5>
                        <ul className="space-y-3 text-xs sm:text-sm">
                            <li className="flex items-start">
                                <FaPhoneAlt className="text-green-500 mr-2.5 mt-0.5 flex-shrink-0 text-sm" />
                                <span>666 888 0000</span>
                            </li>
                            <li className="flex items-start">
                                <FaEnvelope className="text-green-500 mr-2.5 mt-0.5 flex-shrink-0 text-sm" />
                                <span>info@company.com</span>
                            </li>
                            <li className="flex items-start">
                                <FaMapMarkerAlt className="text-green-500 mr-2.5 mt-0.5 flex-shrink-0 text-sm" />
                                <span>66 top broklyn <br /> street, New York</span>
                            </li>
                        </ul>
                    </div>

                    {/* Kolom 3: Links (Lebar sekitar 2/12) */}
                    <div className="md:col-span-3 lg:col-span-2">
                        <h5 className="text-white text-base sm:text-lg font-semibold mb-4">Links</h5>
                        <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                            <li><a href="#" className="hover:text-green-500 transition-colors">Top Sellers</a></li>
                            <li><a href="#" className="hover:text-green-500 transition-colors">Shopping</a></li>
                            <li><a href="#" className="hover:text-green-500 transition-colors">About Store</a></li>
                            <li><a href="#" className="hover:text-green-500 transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-green-500 transition-colors">Help</a></li>
                        </ul>
                    </div>

                    {/* Kolom 4: Explore (Lebar sekitar 2/12) */}
                    <div className="md:col-span-3 lg:col-span-2">
                        <h5 className="text-white text-base sm:text-lg font-semibold mb-4">Explore</h5>
                        <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                            <li><a href="#" className="hover:text-green-500 transition-colors">New Products</a></li>
                            <li><a href="#" className="hover:text-green-500 transition-colors">My Account</a></li>
                            <li><a href="#" className="hover:text-green-500 transition-colors">Support</a></li>
                            <li><a href="#" className="hover:text-green-500 transition-colors">FAQs</a></li>
                        </ul>
                    </div>

                    {/* Kolom 5: Newsletter (Lebar sekitar 2/12) */}
                    <div className="md:col-span-6 lg:col-span-2"> {/* Di md ambil sisa lebar, di lg 2/12 */}
                        <h5 className="text-white text-base sm:text-lg font-semibold mb-4">Newsletter</h5>
                        <form>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full px-3 py-2.5 mb-3 bg-white border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                            <button
                                type="submit"
                                className="w-full bg-green-500 text-white py-2.5 rounded-md text-sm font-semibold hover:bg-green-600 transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Garis Pemisah */}
                <hr className="border-gray-700 my-8 md:my-10" />

                {/* Bagian Bawah Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    {/* Social Media Icons */}
                    <div className="flex space-x-2.5 mb-4 md:mb-0"> {/* Kurangi space antar ikon */}
                        <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-green-500 bg-[#3A3A3A] w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-colors">
                            <FaTwitter size={14} sm:size={16} />
                        </a>
                        <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-green-500 bg-[#3A3A3A] w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-colors">
                            <FaFacebookF size={14} sm:size={16} />
                        </a>
                        <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-green-500 bg-[#3A3A3A] w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-colors">
                            <FaInstagram size={14} sm:size={16} />
                        </a>
                    </div>
                    <p className="text-xs text-gray-500">© Copyright {new Date().getFullYear()} by Company.com</p>
                </div>
            </div>

            {/* Tombol Scroll to Top */}
            <button
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className="fixed bottom-5 right-5 bg-green-500 text-white w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all duration-300 z-50"
            >
                <FaChevronUp size={16} sm:size={18} />
            </button>
        </footer>
    );
}