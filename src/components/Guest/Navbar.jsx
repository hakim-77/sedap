import { FaTwitter, FaFacebookF, FaInstagram, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";

export default function Navbar() {
    const menuClass = ({ isActive }) =>
        `px-4 py-2 ${isActive ? "text-hijau font-bold" : "text-gray-600 hover:text-hijau"}`;

    return (
        <div className="w-full shadow-md">
            {/* Top Bar */}
            <div className="flex justify-between items-center px-6 py-3 text-sm text-gray-600">
                {/* Left: Social Icons */}
                <div className="flex space-x-4">
                    <FaTwitter />
                    <FaFacebookF />
                    <FaInstagram />
                </div>

                {/* Center: Email + Logo + Phone */}
                <div className="flex items-center space-x-8">
                    <div className="flex items-center space-x-2">
                        <MdEmail className="text-hijau" />  
                        <span>info@sedap.com</span>
                    </div>

                    <Logo />

                    <div className="flex items-center space-x-2">
                        <MdPhone className="text-hijau" />
                        <span>92 666 888 0000</span>
                    </div>
                </div>

                {/* Right: Search & Cart */}
                <div className="flex space-x-4 text-lg">
                    <FaSearch className="cursor-pointer" />
                    <FaShoppingCart className="cursor-pointer" />
                </div>
            </div>

            {/* Bottom Navigation Bar */}
            <div className="bg-gray-100 px-6 py-2 flex justify-between items-center text-sm">
                {/* Left: Login/Register */}
                <div className="flex items-center space-x-2">
                    <FaUser className="text-hijau" />
                    <NavLink to="/login" className={menuClass}>Login</NavLink>
                    <span>/</span>
                    <NavLink to="/register" className={menuClass}>Register</NavLink>
                </div>

                {/* Center: Menu */}
                <nav className="flex space-x-4">
                    <NavLink to="/" className={menuClass}>Home</NavLink>
                    <NavLink to="/about" className={menuClass}>About</NavLink>
                    <NavLink to="/produks" className={menuClass}>Shop</NavLink>
                    <NavLink to="/news" className={menuClass}>News</NavLink>
                    <NavLink to="/contact" className={menuClass}>Contact</NavLink>
                </nav>

                {/* Right: Language */}
                <div className="flex items-center space-x-1">
                    <img src="public/img/flag-1-1.jpg" alt="flag" className="w-5 h-5 rounded-full" />
                    <span>English</span>
                    <span className="text-xs">▼</span>
                </div>
            </div>
        </div>
    );
}
