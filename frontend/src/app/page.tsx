"use client"
import React, {useEffect, useState} from "react";
import Header from "./components/header.tsx";
import Footer from "./components/footer.tsx";
import './globals.css';

export default function Home() {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/details_sample")
            .then((res) => res.json())
            .then((json) => setData(json));
    }, []);

    return (
        <main className="flex flex-col min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <Header />

            {/* Game Library */}
            <section className="px-4 py-8 md:px-8">
                <h2 className="text-2xl font-semibold mb-6">Explore Games</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {data.map((game: any) => (
                        <article
                            key={game.id}
                            className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-200"
                        >
                            <img
                                src={game.imageUrl}
                                alt={game.name}
                                className="w-full h-48 object-cover"
                                loading="lazy"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-bold">{game.name}</h3>
                                <p className="text-sm text-gray-400 mt-2">{game.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

           {/* Footer */}
           <Footer />   
        </main>
    );
}