import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProfilPage = () => {
    const [username, setUsername] = useState("");
    const [purchasedGames, setPurchasedGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await fetch(`http://localhost:5000/api/user/${userId}`);
                if (!userResponse.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const userData = await userResponse.json();
                setUsername(userData.pseudo);

                const purchaseResponse = await fetch(`http://localhost:5000/api/achat/${userId}`);
                if (!purchaseResponse.ok) {
                    throw new Error("Failed to fetch purchased games");
                }
                const purchaseData = await purchaseResponse.json();

                setPurchasedGames(purchaseData.games.map((game) => ({
                    id: game.ID_Jeu,
                    name: game.primary_key,
                    description: `Purchased on ${new Date(game.date_achat).toLocaleDateString()}`,
                    imageUrl: game.imageUrl || "https://via.placeholder.com/150",
                })));
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    return (
        <main className="flex flex-col min-h-screen bg-gray-900 text-white">
            <Header />

            <section className="flex-grow px-4 py-8 md:px-8">
                {loading ? (
                    <p className="text-gray-400">Chargement...</p>
                ) : (
                    <>
                        <h2 className="text-2xl font-semibold mb-6">Profil de {username}</h2>
                        <p className="text-gray-400 mb-4">Bienvenue sur votre page de profil, {username}.</p>

                        <h3 className="text-xl font-semibold mb-4">Vos jeux</h3>
                        {purchasedGames.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {purchasedGames.map((game) => (
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
                        ) : (
                            <p className="text-gray-400">Vous ne possédez pas de jeux.</p>
                        )}
                    </>
                )}
            </section>

            <Footer />
        </main>
    );
};

export default ProfilPage;