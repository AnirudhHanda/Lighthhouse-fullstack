import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from "./components/Nvabar.jsx";
import HomePage from "./components/HomePage.jsx";
import ProductsPage from "./components/ProductsPage.jsx";
import ProductPage from "./components/ProductPage.jsx";
import ReviewForm from "./components/ReviewForm.jsx";
import AdminPage from "./components/AdminPage.jsx";
import AddProductPage from "./components/AddProductPage.jsx";
import EditProductPage from "./components/EditProductPage.jsx";
import Footer from "./components/Footer.jsx";

function App() {
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem('theme') === 'dark'
    );

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleTheme
        = () => {
        const newTheme = isDarkMode ? 'light' : 'dark';
        setIsDarkMode(!isDarkMode);
        localStorage.setItem('theme', newTheme);
    };
  return (
    <Router>
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} /> {/* Include your Navbar component */}
      <Routes>
          <Route path="/" element={<HomePage isDarkMode={isDarkMode} />} />
        <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/product/:productId/review" element={<ReviewForm />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/add-product" element={<AddProductPage />} />
          <Route path="/admin/edit-product/:productId" element={<EditProductPage />} />
        {/* Add more routes as needed */}
      </Routes>
        <Footer />
    </Router>
  );
}

export default App;