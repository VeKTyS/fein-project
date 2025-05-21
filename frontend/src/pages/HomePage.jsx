import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useGamesData } from '../data/gameData';

function decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}


const HomePage = () => {
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

    return (
        <main className="flex flex-col min-h-screen bg-gray-900 text-white">
            <Header />
            <section className="px-4 py-8 md:px-8">
                <h2 className="text-2xl font-semibold mb-6">Explore Games</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {data.map((game) => {
                        const ratingObj = ratings.find(r => r.gameId === game.id) || {};
                        return (
                            <article
                                key={game.id}
                                className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-200 flex items-center"
                            >
                                <Link to={`/game/${game.id}`} className="flex items-center w-full">
                                    {/* Thumbnail Section */}
                                    <img
                                        src={ratingObj.thumbnail || game.imageUrl}
                                        alt={game.name}
                                        className="w-16 h-16 object-cover flex-shrink-0 m-4 rounded"
                                        loading="lazy"
                                    />
                                    {/* Info Section */}
                                    <div className="p-4 flex-1">
                                        <h3 className="text-lg font-bold text-white">{game.primary_key}</h3>
                                        <p className="text-sm text-gray-400 mt-2">
                                            {game.description && game.description.length > 100
                                                ? decodeHtml(game.description.slice(0, 100)) + '...'
                                                : decodeHtml(game.description)}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-2">
                                            <strong>Rating:</strong> {ratingObj.value?.toFixed(1) ?? 'N/A'}
                                        </p>
                                    </div>
                                </Link>
                            </article>
                        );
                    })}
                </div>
            </section>
            <Footer />
        </main>
    );
};

export default HomePage;