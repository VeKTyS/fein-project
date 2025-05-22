import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Settings = () => {
    const navigate = useNavigate();
    const [isCheckingLogin, setIsCheckingLogin] = useState(true);
    const [formData, setFormData] = useState({
        pseudo: '',
        mot_de_passe: '',
    });

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            navigate('/login');
        } else {
            fetch(`http://localhost:5000/api/user/${userId}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Échec de la récupération des données utilisateur');
                    }
                    return response.json();
                })
                .then((data) => {
                    setFormData({
                        pseudo: data.pseudo,
                        mot_de_passe: '',
                    });
                    setIsCheckingLogin(false);
                })
                .catch((error) => {
                    console.error('Erreur lors de la récupération des données utilisateur :', error);
                    navigate('/login');
                });
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem('userId');
            const response = await fetch(`http://localhost:5000/api/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Informations mises à jour avec succès !');
            } else {
                alert('Erreur lors de la mise à jour des informations.');
            }
        } catch (error) {
            console.error('Erreur :', error);
            alert('Une erreur est survenue.');
        }
    };

    if (isCheckingLogin) {
        return null;
    }

    return (
        <main className="flex flex-col min-h-screen bg-gray-900 text-white">
            <Header />
            <section className="flex-grow flex items-center justify-center">
                <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Paramètres</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="pseudo" className="block text-sm font-medium text-gray-300 mb-2">
                                Nom d'utilisateur
                            </label>
                            <input
                                type="text"
                                id="pseudo"
                                name="pseudo"
                                value={formData.pseudo}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Entrez votre nom d'utilisateur"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="mot_de_passe" className="block text-sm font-medium text-gray-300 mb-2">
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                id="mot_de_passe"
                                name="mot_de_passe"
                                value={formData.mot_de_passe}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Entrez un nouveau mot de passe"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Mettre à jour
                        </button>
                    </form>
                </div>
            </section>
            <Footer />
        </main>
    );
};

export default Settings;