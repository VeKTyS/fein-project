import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import './index.css'
import HomePage from './pages/HomePage.jsx'
import GameDetails from './pages/GameDetails.jsx'; 
import Category from './pages/Category.jsx';
import CategoryDetails from './pages/CategoryDetails.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Settings from './pages/Settings.jsx';
import ProfilPage from './pages/ProfilPage.jsx';
import LibrairiePage from './pages/LibrairiePage.jsx';
import Discover from './pages/Discover.jsx';


const Main = () => {
  return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/game/:id" element={<GameDetails />} />
                <Route path="/category" element={<Category />} />
                <Route path="/category/:category" element={<CategoryDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profil/:id" element={<ProfilPage />} />
                <Route path="/librairie/:id" element={<LibrairiePage />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="*" element={<h2 className="text-2xl font-semibold">Page non trouvée</h2>} />
            </Routes>
        </Router>
    );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main />
  </StrictMode>,
)
