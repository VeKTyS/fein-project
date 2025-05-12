import React from 'react';
import { useParams } from 'react-router-dom';
import detailsSample from "../data/details_sample.json";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom'; // Import Link for navigation

const CategoryDetails = () => {
    const { category } = useParams(); // Get the category from the URL
    const filteredGames = detailsSample.filter(
        (game) => game.boardgamecategory === category
    ); // Filter games by category

    return (
        <main className="flex flex-col min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <Header />

            {/* Category Details Section */}
            <section className="px-4 py-8 md:px-8">
                <h2 className="text-2xl font-semibold mb-6">
                    Games in "{category}" Category
                </h2>
                {filteredGames.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredGames.map((game) => (
                            <Link to={`/game/${game.id}`}>
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
                                        <p className="text-sm text-gray-400 mt-2">
                                            {game.description}
                                        </p>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">No games found in this category.</p>
                )}
            </section>

            {/* Footer */}
            <Footer />
        </main>
    );
};

export default CategoryDetails;