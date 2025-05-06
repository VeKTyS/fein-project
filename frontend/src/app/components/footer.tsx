"use client";

import React, { useState } from "react";

export default function Footer() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <footer className="bg-gray-800 p-4 text-center mt-auto">
            <p className="text-xs text-gray-400">
                © 2025 VONG Lucas WANG Leo REN Jonathan. Tous droits réservés.
            </p>
        </footer>
    );
}