import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        pseudo: '',
        mot_de_passe: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('userId', data.user.ID_Utilisateur);
                alert('Connexion réussie !');
                navigate('/');
            } else {
                const errorData = await response.json();
                alert(`Erreur: ${errorData.message || 'Une erreur est survenue.'}`);
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Une erreur est survenue.');
        }
    };

    return (
        <main className="flex flex-col min-h-screen bg-gray-900 text-white">
            <Header />
            <section className="flex-grow flex items-center justify-center">
                <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="pseudo" className="block text-sm font-medium text-gray-300 mb-2">
                                Pseudo
                            </label>
                            <input
                                type="text"
                                id="pseudo"
                                name="pseudo"
                                value={formData.pseudo}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Entrez votre pseudo"
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
                                placeholder="Entrez votre mot de passe"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Se connecter
                        </button>
                    </form>
                    <p className="text-sm text-gray-400 mt-6 text-center">
                        Vous n'avez pas de compte ?{' '}
                        <Link to="/register" className="text-blue-500 hover:underline">
                            Inscrivez-vous
                        </Link>
                    </p>
                </div>
            </section>
            <Footer />
        </main>
    );
};

export default Login;