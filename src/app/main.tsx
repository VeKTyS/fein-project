import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page";
import About from "./about"; // Example: another page

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Add more routes here */}
      </Routes>
    </BrowserRouter>
  );
}