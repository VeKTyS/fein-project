import React from 'react';
import { useParams } from 'react-router-dom';
import detailsSample from "../data/details_sample.json";
import Header from '../components/Header';
import Footer from '../components/Footer';

const GameDetails = () => {
    const { id } = useParams(); // Get the game ID from the route parameter
    const game = detailsSample.find((game) => game.id === parseInt(id)); // Find the game by ID

    if (!game) {
        return (
            <main className="flex flex-col min-h-screen bg-gray-900 text-white">
                <Header />
                <section className="flex-grow flex items-center justify-center">
                    <h2 className="text-2xl font-semibold">Game not found</h2>
                </section>
                <Footer />
            </main>
        );
    }

    return (
        <main className="flex flex-col min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <Header />

            {/* Game Details */}
            <section className="px-4 py-8 md:px-8">
                <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <img
                        src={game.imageUrl}
                        alt={game.name}
                        className="w-full h-64 object-cover"
                        loading="lazy"
                    />
                    <div className="p-6">
                        <h1 className="text-3xl font-bold mb-4">{game.name}</h1>
                        <p className="text-gray-400 text-lg mb-6">{game.description}</p>
                        <div className="text-sm text-gray-300">
                            <p><strong>Genre:</strong> {game.boardgamecategory}</p>
                            <p><strong>Players:</strong> {game.minplayers} - {game.maxplayers}</p>
                            <p><strong>Play Time:</strong> {game.minplaytime} - {game.maxplaytime} minutes</p>
                            <p><strong>Designer:</strong> {game.boardgamedesigner}</p>
                            <p><strong>Artist:</strong> {game.boardgameartist}</p>
                            <p><strong>Publisher:</strong> {game.boardgamepublisher}</p>
                            <p><strong>Release Date:</strong> {game.yearpublished}</p>
                            <p><strong>Rating:</strong> {game.averageuserrating} / 10</p>
                            <p><strong>Rank:</strong> {game.boardgamerank}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </main>
    );
};

export default GameDetails;