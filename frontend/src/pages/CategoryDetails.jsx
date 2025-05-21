import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useGamesData } from '../data/gameData';

// Decode les entités HTML
function decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

// Nettoie les catégories (enlève crochets et apostrophes)
const removeBrackets = (str) => {
    if (typeof str === 'string') {
        return str.replace(/[\[\]']/g, '');
    }
    return '';
};

const CategoryDetails = () => {
    const { category } = useParams();
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

    const filteredGames = data.filter((game) => {
        const rawCategories = removeBrackets(game.boardgamecategory);
        const categories = rawCategories.split(',').map(cat => cat.trim().toLowerCase());
        return categories.includes(category.toLowerCase());
    });

    return (
        <main className="flex flex-col min-h-screen bg-gray-900 text-white">
            <Header />
            <section className="px-4 py-8 md:px-8">
                <h2 className="text-2xl font-semibold mb-6">
                    Jeux dans la catégorie "{category}"
                </h2>
                {filteredGames.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredGames.map((game) => {
                            const ratingObj = ratings.find(r => r.gameId === game.id) || {};
                            return (
                                <Link to={`/game/${game.id}`} key={game.id}>
                                    <article className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-200">
                                        {ratingObj.thumbnail && (
                                            <img
                                                src={ratingObj.thumbnail}
                                                alt={game.primary_key}
                                                className="w-full h-48 object-cover"
                                                loading="lazy"
                                            />
                                        )}
                                        <div className="p-4">
                                            <h3 className="text-lg font-bold">{game.primary_key}</h3>
                                            <p className="text-sm text-gray-400 mt-2">
                                                {game.description && game.description.length > 100
                                                    ? decodeHtml(game.description.slice(0, 100)) + '...'
                                                    : decodeHtml(game.description)}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-2">
                                                <strong>Note :</strong> {ratingObj.value?.toFixed(1) ?? 'N/A'}
                                            </p>
                                        </div>
                                    </article>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-gray-400">Aucun jeu trouvé dans cette catégorie.</p>
                )}
            </section>
            <Footer />
        </main>
    );
};

export default CategoryDetails;
