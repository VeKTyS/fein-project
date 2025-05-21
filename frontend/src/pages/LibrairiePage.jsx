import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LibrairiePage = () => {
    const [games, setGames] = useState([]); // State to store games
    const [loading, setLoading] = useState(true); // Loading state
    const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/achat/${userId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch games");
                }
                const data = await response.json();

                setGames(data.games.map((game) => ({
                    id: game.ID_Jeu,
                    name: game.primary_key, // Use the actual game name from the backend
                    description: `Acheté le ${new Date(game.date_achat).toLocaleDateString()}`,
                })));
            } catch (error) {
                console.error("Error fetching games:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, [userId]);

    const removeGame = async (gameId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/achat/${userId}/${gameId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error("Failed to remove game");
            }

            // Update state to remove the game from the list
            setGames((prevGames) => prevGames.filter((game) => game.id !== gameId));
        } catch (error) {
            console.error("Error removing game:", error);
        }
    };

    return (
        <main className="flex flex-col min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <Header />

            {/* Content */}
            <section className="flex-grow px-4 py-8 md:px-8">
                <h2 className="text-2xl font-semibold mb-6">Votre Librairie</h2>
                <p className="text-gray-400 mb-4">Bienvenue dans votre librairie de jeux.</p>

                {loading ? (
                    <p className="text-gray-400">Chargement...</p>
                ) : games.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {games.map((game) => (
                            <article
                                key={game.id}
                                className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-200 relative"
                            >
                                <div className="p-4">
                                    <h3 className="text-lg font-bold">{game.name}</h3>
                                    <p className="text-sm text-gray-400 mt-2">{game.description}</p>
                                </div>
                                {/* Remove button */}
                                <button
                                    onClick={() => removeGame(game.id)}
                                    className="absolute top-2 right-2 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-700 transition"
                                    aria-label="Remove game"
                                >
                                    &minus;
                                </button>
                            </article>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">Vous n'avez pas encore de jeux dans votre librairie.</p>
                )}
            </section>

            {/* Footer */}
            <Footer />
        </main>
    );
};

export default LibrairiePage;