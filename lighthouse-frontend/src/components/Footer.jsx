import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLinkedin,
    faInstagram,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <footer className="flex flex-col md:flex-row bg-[#9ae4ff] pb-7 dark:bg-gradient-to-r dark:from-blue-700 dark:to-navy-900">
            {/* Download Section */}
            <div className="download w-full md:w-1/4 text-center grid mt-2 px-4 md:px-0">
                <h4 className="font-roboto text-black font-bold p-1 mb-0.5">DOWNLOAD OUR APP</h4>
                <p className="text-black font-roboto p-1 mb-0">Download App for Android and IOS</p>
                <div className="flex justify-center space-x-4 mt-2">
                    <Link to="/coming-soon">
                        <img src="/image/google_place.png" alt="Google Play" width="500" />
                    </Link>
                    <Link to="/coming-soon">
                        <img src="/image/apple_place.png" alt="App Store" width="500" />
                    </Link>
                </div>
            </div>

            {/* Pages Section */}
            <div className="pages grid w-full md:w-1/6 text-center mt-4 px-4 md:px-0">
                <Link to="/about" className="no-underline font-bold font-changa text-black text-base hover:text-gray-600">
                    About Us
                </Link>
                <Link to="/services" className="no-underline font-bold font-changa text-black text-base hover:text-gray-600">
                    Services
                </Link>
                <Link to="/blog" className="no-underline font-bold font-changa text-black text-base hover:text-gray-600">
                    Blogs
                </Link>
                <Link to="/login" className="no-underline font-bold font-changa text-black text-base hover:text-gray-600">
                    Log in
                </Link>
                <Link to="/signup" className="no-underline font-bold font-changa text-black text-base hover:text-gray-600">
                    Sign up
                </Link>
            </div>

            {/* Logo Section */}
            <div className="logo_bot text-center w-full md:w-1/3 mt-4 md:mt-0 px-4 md:px-0">
                <img src="/image/logo_3.png" alt="Lighthouse Logo" className="h-32 w-auto mx-auto md:mr-1/3 mt-10 mb-0" />
                <p id="customer" className="text-base mt-0">Customer satisfaction is our first priority</p>
                <p>Copyrights &copy; 2022 Anirudh Handa</p>
            </div>

            {/* Documents Section */}
            <div className="doc grid place-content-center w-full md:w-1/6 text-right mt-5 pr-2 px-4 md:px-0">
                <Link to="/coming-soon" className="no-underline font-bold font-changa text-black text-base hover:text-gray-600 pl-2">
                    Privacy Policy
                </Link>
                <Link to="/coming-soon" className="no-underline font-bold font-changa text-black text-base hover:text-gray-600 pl-2">
                    Refund Policy
                </Link>
                <Link to="/coming-soon" className="no-underline font-bold font-changa text-black text-base hover:text-gray-600 pl-2">
                    Terms Of Use
                </Link>
            </div>

            {/* Follow Us Section */}
            <div className="follow grid w-full md:w-1/4 text-center mt-4 md:mt-0 px-4 md:px-0">
                <h4 className="font-roboto text-black text-2xl font-bold p-1 mb-0.5 underline">Follow Us</h4>
                <div className="flex flex-col justify-between space-x-4">
                    <a href="https://www.linkedin.com/in/anirudh-handa-138088237/" target="_blank" rel="noopener noreferrer" className="text-black transition duration-500 hover:text-blue-500">
                        <FontAwesomeIcon className={'ml-4'} icon={faLinkedin} size="2x" />
                    </a>
                    <a href="https://www.instagram.com/royale_harmonica/" target="_blank" rel="noopener noreferrer" className="text-black transition duration-500 hover:text-blue-500">
                        <FontAwesomeIcon icon={faInstagram} size="2x" />
                    </a>
                    <a href="https://twitter.com/21bcs014" target="_blank" rel="noopener noreferrer" className="text-black transition duration-500 hover:text-blue-500">
                        <FontAwesomeIcon icon={faTwitter} size="2x" />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;