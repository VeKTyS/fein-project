import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        pseudo: '',
        nom: '',
        prenom: '',
        mot_de_passe: '',
        date_de_naissance: '',
    });

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setIsLoggedIn(true);
            navigate('/settings');
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // reset previous error

        try {
            const response = await fetch('http://localhost:5000/api/utilisateur', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Inscription réussie !');
                navigate('/login');
            } else {
                setErrorMessage(result.error || 'Erreur lors de l\'inscription.');
            }
        } catch (error) {
            console.error('Erreur:', error);
            setErrorMessage('Une erreur est survenue.');
        }
    };

    if (isLoggedIn) {
        return null;
    }

    return (
        <main className="flex flex-col min-h-screen bg-gray-900 text-white">
            <Header />
            <section className="flex-grow flex items-center justify-center">
                <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Inscription</h2>
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
                        <div className="mb-4">
                            <label htmlFor="nom" className="block text-sm font-medium text-gray-300 mb-2">
                                Nom
                            </label>
                            <input
                                type="text"
                                id="nom"
                                name="nom"
                                value={formData.nom}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Entrez votre nom"
                                
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="prenom" className="block text-sm font-medium text-gray-300 mb-2">
                                Prénom
                            </label>
                            <input
                                type="text"
                                id="prenom"
                                name="prenom"
                                value={formData.prenom}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Entrez votre prénom"
                                
                            />
                        </div>
                        <div className="mb-4">
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
                        <div className="mb-6">
                            <label htmlFor="date_de_naissance" className="block text-sm font-medium text-gray-300 mb-2">
                                Date de naissance
                            </label>
                            <input
                                type="date"
                                id="date_de_naissance"
                                name="date_de_naissance"
                                value={formData.date_de_naissance}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                
                            />
                        </div>

                        {errorMessage && (
                            <p className="text-red-500 text-sm mb-4 text-center">
                                {errorMessage}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            S'inscrire
                        </button>
                    </form>
                    <p className="text-sm text-gray-400 mt-6 text-center">
                        Vous avez déjà un compte ?{' '}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Connectez-vous
                        </Link>
                    </p>
                </div>
            </section>
            <Footer />
        </main>
    );
};

export default Register;
