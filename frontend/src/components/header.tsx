import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setIsLoggedIn(true);
            setUserId(storedUserId);

            fetch(`http://localhost:5000/api/user/${storedUserId}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch user data");
                    }
                    return response.json();
                })
                .then((data) => {
                    setUserName(data.pseudo);
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
        setUserId("");
        navigate("/login");
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-gray-900 text-white shadow-md">
            <div className="flex items-center justify-between px-6 py-4">
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
                        {isLoggedIn && (
                            <>
                                <Link to={`/librairie/${userId}`} className="hover:text-blue-400">
                                    LIBRAIRIE
                                </Link>
                                {/* <Link to={`/profil/${userId}`} className="hover:text-blue-400">
                                    PROFIL
                                </Link> */}
                            </>
                        )}
                    </nav>
                </div>

                <div className="relative" ref={dropdownRef}>
                    {isLoggedIn ? (
                        <div className="flex items-center space-x-2">
                            <button
                                className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <span>{userName || "Chargement..."}</span>
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
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg">
                                    <ul className="py-1">
                                        <li>
                                            <Link
                                                to="/settings"
                                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                                            >
                                                Paramètres
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                                            >
                                                Déconnexion
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white"
                            onClick={() => navigate("/login")}
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
                    )}
                </div>
            </div>
            <div className="bg-gray-800 px-6 py-2">
                <nav className="flex space-x-6">
                    <Link to="/" className="text-sm text-gray-400 hover:text-white">
                        Accueil
                    </Link>
                    <Link to="/category" className="text-sm text-gray-400 hover:text-white">
                        Catégorie
                    </Link>
                    <Link to="/discover" className="text-sm text-gray-400 hover:text-white">
                        Découvrir
                    </Link>
                </nav>
            </div>
        </header>
    );
}