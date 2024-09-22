import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

function Navbar({ isDarkMode, toggleTheme }) {
    // const [isDarkMode, setIsDarkMode] = useState(
    //     localStorage.getItem('theme') === 'dark'
    // );
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    // const
    //     toggleTheme = () => {
    //         const newTheme = isDarkMode ? 'light' : 'dark';
    //         setIsDarkMode(!isDarkMode);
    //         localStorage.setItem('theme', newTheme);
    //         document.documentElement.classList.toggle('dark',
    //             !isDarkMode);
    //     };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [isDarkMode]);

    useEffect(() => {
        const
            delayDebounceFn = setTimeout(() => {
                if (searchQuery.trim() !== '') {
                    axios.get(`http://localhost:8080/api/v1/products/search?keyword=${searchQuery}`)
                        .then(response => {
                            setSearchResults(response.data);
                        })
                        .catch(error => {
                            console.error('Error fetching search results:', error);
                        });
                } else
                {
                    setSearchResults([]);
                }
            }, 300)

        return () => clearTimeout(delayDebounceFn)
    }, [searchQuery]);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') { // Check if Enter key is pressed
            handleSearchResultClick(); // Trigger search
        }
    };

    const handleSearchResultClick = (productId) => {
        navigate(`/products?keyword=${searchQuery}`, { state: { productId } });
        setSearchQuery('');
        setSearchResults([]);
    };

    const [isSearchOpen, setIsSearchOpen] = useState(false); // New state for search visibility

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (!isSearchOpen) {
            // Focus on the search input when it becomes visible
            setTimeout(() => {
                const searchInput = document.getElementById('searchInput');
                if (searchInput) {
                    searchInput.focus();
                }
            }, 0); // Timeout to ensure the input is rendered before focusing
        }
    };
    return (
        <nav className="nav nav_top bg-gradient-to-b from-white to-blue-200  dark:bg-gradient-to-b dark:from-gray-400 dark:to-blue-700 shadow-lg z-10 h-16 w-full fixed top-0 left-0 right-0">
            <div className="container mx-auto flex justify-between items-center px-4">
                <Link to="/">
                    <img src="/image/logo_3.png" alt="Lighthouse Logo" className="w-56 h-auto transition-all duration-1000 hover:w-60" />
                </Link>

                {/* Desktop Navigation */}
                <div className="flex items-center">
                    <ul className="hidden md:flex justify-end space-x-6 text-black dark:text-gray-300 font-bold text-lg font-changa">
                        <li>
                            <Link to="/about"
                                  className="no-underline transition duration-1000 hover:text-blue-500 hover:text-xl">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/products"
                                  className="no-underline transition duration-1000 hover:text-blue-500 hover:text-xl">
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link to="/blog"
                                  className="no-underline transition duration-1000 hover:text-blue-500 hover:text-xl">
                                Blogs
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact"
                                  className="no-underline transition duration-1000 hover:text-blue-500 hover:text-xl">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link to="/login"
                                  className="no-underline transition duration-1000 hover:text-blue-500 hover:text-xl">
                                Login/Register
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin" className="text-gray-500 dark:text-gray-300 hover:text-gray-700 text-sm">
                                Admin
                            </Link>
                        </li>
                    </ul>

                    {/* Search Bar (hidden on mobile) */}
                    <div className="relative hidden md:block">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            onKeyDown={handleSearchKeyDown}
                            id="searchInput" // Add ID for focusing
                            className="border ml-4 rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />

                        {searchResults.length > 0 && (
                            <ul className="absolute top-full left-0 right-0 bg-white dark:bg-blue-200 shadow-lg rounded-lg mt-2 z-20">
                                {searchResults.map((product) => (
                                    <li
                                        key={product.id}
                                        className="cursor-pointer px-4 py-2 shadow-lg rounded-lg mt-2 z-20 hover:bg-gray-100 dark:hover:bg-blue-500"
                                        onClick={() => handleSearchResultClick(product.id)}
                                    >
                                        {product.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Theme Toggle */}
                    <button onClick={toggleTheme} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full p-2 ml-4">
                        {isDarkMode ? '☀️' : '🌙'}
                    </button>
                    {/* Search Icon (only on mobile) */}
                    <button onClick={toggleSearch} className="md:hidden text-black focus:outline-none mr-4">
                        <FontAwesomeIcon icon={faSearch} className="h-6 w-6 ml-4" />
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMobileMenu} className="text-black focus:outline-none mr-4">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                             strokeLinecap="round" strokeLinejoin="round">
                            {/* Set stroke to currentColor */}
                            {isMobileMenuOpen ? (
                                <path
                                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.828-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.828-4.828-4.828a1 1 0 0 1 1.414-1.414l4.828 4.828 4.828-4.828a1 1 0 0 1 1.414 1.414l-4.828 4.828 4.828 4.828z"/>
                            ) : (
                                <path d="M4 6h16M4 12h16m-7 6h7"/>
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu with Animation and Overflow Handling */}
            {isMobileMenuOpen && (
                <div
                    className={`md:hidden absolute top-16  left-0 right-0 bg-gradient-to-b from-white to-blue-200 dark:bg-gradient-to-b dark:from-gray-400 dark:to-blue-700 p-4 transition-all duration-500 ease-in-out transform ${
                        isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                    }`}
                >
                    <ul className="flex flex-col space-y-4 font-changa overflow-y-auto max-h-64">
                        <li>
                            <Link to="/about"
                                  className="text-black dark:text-gray-200 hover:text-blue-500 font-bold text-lg transition duration-300" onClick={toggleMobileMenu}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/products" className="text-black dark:text-gray-200 hover:text-blue-500 font-bold text-lg transition duration-300" onClick={toggleMobileMenu}>
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link to="/blog" className="text-black dark:text-gray-200 hover:text-blue-500 font-bold text-lg transition duration-300" onClick={toggleMobileMenu}>
                                Blogs
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="text-black dark:text-gray-200 hover:text-blue-500 font-bold text-lg transition duration-300" onClick={toggleMobileMenu}>
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link to="/login" className="text-black dark:text-gray-200 hover:text-blue-500 font-bold text-lg transition duration-300" onClick={toggleMobileMenu}>
                                Login/Register
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin" className="text-gray-800 dark:text-gray-300 hover:text-gray-600 text-sm" onClick={toggleMobileMenu}>
                                Admin
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
            {isSearchOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-blue-200 dark:bg-gray-800 p-4 z-20">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            onKeyDown={handleSearchKeyDown}
                            className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                        />

                        {/* ... (search results dropdown) */}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;