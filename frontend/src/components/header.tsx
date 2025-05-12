import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate

export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate(); // Use useNavigate for navigation

    return (
        <header className="bg-gray-900 text-white shadow-md">
            <div className="flex items-center justify-between px-6 py-4">
                {/* Left Section: Logo and Navigation */}
                <div className="flex items-center space-x-6">
                    <Link to="/">
                        <img
                            src="/images/logofein.png"
                            alt="Logo"
                            className="h-8 w-8"
                        />
                    </Link>
                    <nav className="flex space-x-4">
                        <Link to="/" className="hover:text-blue-400">
                            MAGASIN
                        </Link>
                        <a href="#" className="hover:text-blue-400">
                            LIBRAIRIE
                        </a>
                        <a href="#" className="hover:text-blue-400">
                            PROFIL
                        </a>
                    </nav>
                </div>

                {/* Center Section: Search Bar */}
                <div className="flex items-center bg-gray-800 rounded-md px-4 py-2">
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        className="bg-transparent text-sm text-gray-300 focus:outline-none"
                    />
                    <button className="ml-2 text-gray-400 hover:text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 111.5-1.5l4.35 4.35z"
                            />
                        </svg>
                    </button>
                </div>

                {/* Right Section: Se connecter */}
                <div className="relative">
                    <button
                        className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white"
                        onClick={() => navigate("/login")} // Use navigate instead of router.push
                    >
                        <span>Se connecter</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7 10l5 5 5-5H7z"
                            />
                        </svg>
                    </button>
                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div
                            className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg"
                            onMouseEnter={() => setIsDropdownOpen(true)}
                            onMouseLeave={() => setIsDropdownOpen(false)}
                        >
                            <button
                                className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                                onClick={() => alert("Paramètres cliqués")}
                            >
                                Paramètre
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Section: Secondary Navigation */}
            <div className="bg-gray-800 px-6 py-2">
                <nav className="flex space-x-6">
                    <Link to="/" className="text-sm text-gray-400 hover:text-white">
                        Accueil
                    </Link>
                    <Link to="/category" className="text-sm text-gray-400 hover:text-white">    
                        Catégorie
                    </Link>
                    <a href="#" className="text-sm text-gray-400 hover:text-white">
                        Découvrir
                    </a>
                </nav>
            </div>
        </header>
    );
}