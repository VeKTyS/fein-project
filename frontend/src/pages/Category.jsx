import React from 'react';
import { Link } from 'react-router-dom';
import detailsSample from "../data/details_sample.json";
import Header from '../components/Header';
import Footer from '../components/Footer';

const Category = () => {
    // Extract unique categories from detailsSample
    const categories = [...new Set(detailsSample.map((game) => game.boardgamecategory))];

    return (
        <main className="flex flex-col min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <Header />

            {/* Category Section */}
            <section className="px-4 py-8 md:px-8">
                <h2 className="text-2xl font-semibold mb-6">Explore by Category</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {categories.map((category, index) => (
                        <Link
                            to={`/category/${category}`} // Navigate to a category-specific page
                            key={index}
                            className="bg-gray-800 text-center text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-500 transition-colors duration-200"
                        >
                            {category}
                        </Link>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </main>
    );
};

export default Category;