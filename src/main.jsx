import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import './index.css'
import HomePage from './pages/HomePage.jsx'
import GameDetails from './pages/GameDetails'; 
import Category from './pages/Category.jsx';
import CategoryDetails from './pages/CategoryDetails.jsx';



const Main = () => {
  return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/game/:id" element={<GameDetails />} />
                <Route path="/category" element={<Category />} />
                <Route path="/category/:category" element={<CategoryDetails />} /> {/* Dynamic route */}
            </Routes>
        </Router>
    );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main />
  </StrictMode>,
)
