import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Discover = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [viewType, setViewType] = useState('');

    const fetchData = async (viewName, type) => {
        setLoading(true);
        setError(null);
        setViewType(type);
        try {
            const response = await fetch(`http://localhost:5000/api/views/${viewName}`);
            if (!response.ok) {
                throw new Error('Échec de la récupération des données.');
            }
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err.message);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex flex-col min-h-screen bg-gray-900 text-white">
            <Header />

            <section className="px-4 py-8 md:px-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-8">Découvrir des Jeux</h1>

                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <button
                            onClick={() => fetchData('Jeux_Rating_Superieur_9', 'rating')}
                            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                        >
                            Jeux très bien notés
                        </button>
                        <button
                            onClick={() => fetchData('Vue_Jeux_Par_Taille_Groupe', 'group')}
                            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                        >
                            Jeux par taille
                        </button>
                        <button
                            onClick={() => fetchData('Vue_Jeux_Par_Duree', 'duration')}
                            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                        >
                            Jeux par durée
                        </button>
                    </div>

                    {loading && (
                        <div className="flex justify-center mb-4">
                            <p className="text-lg font-semibold">Chargement...</p>
                        </div>
                    )}

                    {error && (
                        <div className="flex justify-center mb-4">
                            <p className="text-red-500 text-lg font-semibold">Erreur : {error}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.map((game) => (
                            <div
                                key={game.id || game.primary_key}
                                className="bg-gray-800 rounded-lg shadow-md overflow-hidden"
                            >
                                <div className="p-4">
                                    <h2 className="text-xl font-bold text-blue-400 hover:underline">
                                        <Link to={`/game/${game.id || ''}`}>{game.primary_key || game.name || 'Jeu Sans Nom'}</Link>
                                    </h2>
                                    {viewType === 'rating' && (
                                        <p className="text-sm text-gray-400">
                                            <strong>Note :</strong> {game.average || 'N/A'}
                                        </p>
                                    )}
                                    {viewType === 'group' && (
                                        <p className="text-sm text-gray-400">
                                            <strong>Taille :</strong> {game.Type_Jeu || 'N/A'}
                                        </p>
                                    )}
                                    {viewType === 'duration' && (
                                        <p className="text-sm text-gray-400">
                                            <strong>Durée :</strong> {game.Duree_Type || 'N/A'}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {!loading && data.length === 0 && !error && (
                        <div className="flex justify-center">
                            <p className="text-lg font-semibold">Faites votre choix.</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default Discover;