"use client"
import React, {useEffect, useState} from "react";
import Header from "./components/header.tsx";
import Footer from "./components/footer.tsx";
import './globals.css'

export default function Login() {
    return ( 
        <main className="flex flex-col min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <Header />
            <div className="flex-grow flex items-center justify-center">
                <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm">
                    <h2 className="text-2xl font-semibold mb-6">Se connecter</h2>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium mb-1">Nom d'utilisateur</label>
                            <input type="text" id="username" className="w-full p-2 bg-gray-700 rounded" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium mb-1">Mot de passe</label>
                            <input type="password" id="password" className="w-full p-2 bg-gray-700 rounded" required />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">Login</button>
                    </form>
                </div>
            </div>
            {/* Footer */}
            <Footer />
        </main>
    )
}