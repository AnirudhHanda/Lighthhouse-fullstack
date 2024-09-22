import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // ... (rest of your code: toggleTheme, toggleMobileMenu)

    return (
        <nav className="nav nav_top bg-gradient-to-b from-white to-blue-200 shadow-lg z-10 h-16 w-full fixed top-0 left-0 right-0">
            <div className="container mx-auto flex justify-between items-center px-4">
                <Link to="/">
                    <img src="/image/logo_3.png" alt="Lighthouse Logo" className="w-56 h-auto transition-all duration-1000 hover:w-60" />
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex justify-end space-x-6 text-black font-bold text-lg font-changa mr-8">
                    {/* ... (links) */}
                </ul>

                {/* Mobile Navigation */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMobileMenu} className="text-black focus:outline-none mr-4">
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.828-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.828-4.828-4.828a1 1 0 0 1 1.414-1.414l4.828 4.828 4.828-4.828a1 1 0 0 1 1.414 1.414l-4.828 4.828 4.828 4.828z" />
                            ) : (
                                <path d="M4 6h16M4 12h16m-7 6h7" />
                            )}
                        </svg>
                    </button>

                    {/* Theme Toggle */}
                    <button onClick={toggleTheme} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full p-2">
                        {isDarkMode ? '☀️' : '🌙'}
                    </button>
                </div>
            </div>

            {/* Mobile Menu with Animation */}
            <div className={`md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 p-4 transition-all duration-300 ease-in-out transform ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                <ul className="flex flex-col space-y-4 font-changa">
                    {/* ... (links) */}
                    {/* Admin Link (conditionally rendered) */}
                    <li>
                        <Link to="/admin" className="text-gray-500 hover:text-gray-700 text-sm" onClick={toggleMobileMenu}>
                            Admin
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
