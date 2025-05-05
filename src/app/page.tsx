import React from "react";
import detailsSample from "/data/details_sample.json";

export default function Home() {
    const data = detailsSample;

    return (
        <main className="flex flex-col min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <header className="bg-gray-800 p-6 shadow-md">
                <h1 className="text-3xl font-bold text-center">Fein</h1>
            </header>

            {/* Game Library */}
            <section className="p-8">
                <h2 className="text-2xl font-semibold mb-6">Explore Games</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {data.map((game: any) => (
                        <div
                            key={game.id}
                            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform"
                        >
                            <img
                                src={game.imageUrl}
                                alt={game.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-bold">{game.name}</h3>
                                <p className="text-sm text-gray-400 mt-2">{game.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 p-4 text-center mt-auto">
                <p className="text-sm text-gray-400">
                    © 2025 VONG Lucas WANG Leo REN Jonathan. Tous droits réservés.
                </p>
            </footer>
        </main>
    );
}