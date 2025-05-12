import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import detailsSample from "../data/details_sample.json";
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Ensure detailsSample is an array or transform it into one
        if (Array.isArray(detailsSample)) {
            setData(detailsSample);
        } else {
            console.error("detailsSample is not an array:", detailsSample);
        }
    }, []);

    return (
        <main className="flex flex-col min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <Header />

            {/* Game Library */}
            <section className="px-4 py-8 md:px-8">
                <h2 className="text-2xl font-semibold mb-6">Explore Games</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {data.map((game) => (
                        <article
                            key={game.id}
                            className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-200"
                        >
                            <Link to={`/game/${game.id}`}>
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
                            </Link>
                        </article>
                    ))}
                </div>
            </section>

           {/* Footer */}
           <Footer />   
        </main>
    );
};

export default HomePage;