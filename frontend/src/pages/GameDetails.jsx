import React from 'react';
import { useParams } from 'react-router-dom';
import { useGamesData } from '../data/gameData';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Helper to decode HTML entities
function decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

const GameDetails = () => {
    const { id } = useParams();
    const { data, ratings, loading } = useGamesData();

    if (loading) {
        return (
            <main className="flex flex-col min-h-screen bg-gray-900 text-white">
                <Header />
                <section className="flex-grow flex items-center justify-center">
                    <h2 className="text-2xl font-semibold">Chargement...</h2>
                </section>
                <Footer />
            </main>
        );
    }

    // Find the game based on the id parameter
    const game = data.find(g => g.id === Number(id));

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

    const ratingObj = ratings.find(r => r.gameId === game.id) || {};
    const removeBrackets = (str) => {
        if (typeof str === 'string') {
            return str.replace(/[\[\]']/g, '');
        }
        return '';
    };

    return (
        <main className="flex flex-col min-h-screen bg-gray-900 text-white">
            <Header />

            <section className="px-4 py-8 md:px-8">
                <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                        <h1 className="text-5xl font-bold mb-6 text-center text-white">{game.primary_key}</h1>
                        <p className="text-sm text-gray-400 mt-2">
                            {decodeHtml(game.description)}
                        </p>
                        <div className="text-sm text-gray-300 mt-4">
                            <p><strong>Genre:</strong> {removeBrackets(game.boardgamecategory)}</p>
                            <p><strong>Players:</strong> {game.minplayers} - {game.maxplayers}</p>
                            <p><strong>Play Time:</strong> {game.minplaytime} - {game.maxplaytime} minutes</p>
                            <p><strong>Designer:</strong> {removeBrackets(game.boardgamedesigner)}</p>
                            <p><strong>Artist:</strong> {removeBrackets(game.boardgameartist)}</p>
                            <p><strong>Publisher:</strong> {removeBrackets(game.boardgamepublisher)}</p>
                            <p><strong>Release Year:</strong> {game.yearpublished}</p>
                            <p>
                                <strong>Rating:</strong> {ratingObj.value ? ratingObj.value.toFixed(1) : 'N/A'} / 10
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
};

export default GameDetails;