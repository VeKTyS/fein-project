import React from 'react';
import { useParams } from 'react-router-dom';
import { useGamesData } from '../data/gameData';
import Header from '../components/Header';
import Footer from '../components/Footer';

function decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

const GameDetails = () => {
    const { id } = useParams();
    const { data, ratings, loading } = useGamesData();
    const userId = localStorage.getItem("userId");

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

    const addToAchat = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/achat/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ gameId: game.id }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erreur lors de l'ajout du jeu.");
            }

            alert("Jeu ajouté à votre bibliothèque !");
        } catch (error) {
            console.error("Erreur lors de l'ajout :", error);
            alert(error.message);
        }
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
                        {/* Add to Library Button */}
                        <button
                            onClick={addToAchat}
                            className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                        >
                            + Ajouter à ma librairie
                        </button>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
};

export default GameDetails;