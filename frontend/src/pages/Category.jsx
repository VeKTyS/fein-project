import React from 'react';
import { Link } from 'react-router-dom';
import { useGamesData } from '../data/gameData';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Remove brackets and single quotes
const removeBrackets = (str) => {
    if (typeof str === 'string') {
        return str.replace(/[\[\]']/g, '');
    }
    return '';
};

const Category = () => {
    const { data, loading } = useGamesData();

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

    // Étape clé : extraire les catégories individuelles
    const allCategories = data
        .flatMap(game => {
            const raw = removeBrackets(game.boardgamecategory);
            return raw.split(',').map(cat => cat.trim()).filter(Boolean);
        });

    const uniqueCategories = [...new Set(allCategories)].sort();

    return (
        <main className="flex flex-col min-h-screen bg-gray-900 text-white">
            <Header />

            <section className="px-4 py-8 md:px-8">
                <h2 className="text-2xl font-semibold mb-6">Explore by Category</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {uniqueCategories.map((category, index) => (
                        <Link
                            to={`/category/${encodeURIComponent(category)}`}
                            key={index}
                            className="bg-gray-800 text-center text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-500 transition-colors duration-200"
                        >
                            {category}
                        </Link>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default Category;
