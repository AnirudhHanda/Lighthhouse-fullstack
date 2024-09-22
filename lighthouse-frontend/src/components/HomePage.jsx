import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Products from "./ProductsPage.jsx";
import KeyHighlights from "./KeyHighlights.jsx";
import Testimonials from "./Testimonials.jsx";
import OurWork from "./OurWork.jsx";

function HomePage({ isDarkMode }) {
    // const [isDarkMode, setIsDarkMode] = useState(
    //     localStorage.getItem('theme') === 'dark'
    // );

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [isDarkMode]); // Update whenever isDarkMode changes

    return (
        <div className="bg-white dark:bg-gradient-to-r from-gray-800 to-blue-700">
            <main
                className="main mt-2 bg-cover bg-center bg-fixed bg-no-repeat h-screen"
                style={{
                    backgroundImage: `url(${isDarkMode ? '/image/paralex9.png' : '/image/paralex_3_final.png'})`
                }}
            >
                <div
                    className="main_content container mx-auto flex flex-col items-start justify-start h-full pt-32 px-4 sm:px-6 lg:px-8"> {/* Changed items-center to items-start and justify-center to justify-start */}
                    {/* Responsive heading and text */}
                    <h1 className="text-3xl sm:text-5xl dark:text-gray-200 md:text-7xl lg:text-8xl  font-serif text-[#e9fafd] mb-0 font-changa text-right">Great
                        Discount</h1>
                    <p className="text-lg sm:text-2xl dark:text-gray-200 md:text-3xl text-[#e9fafd] mt-0 ml-4 mb-0 font-changa text-right">SPECIAL
                        OFFER 30% OFF</p>

                    {/* Button */}
                    <div className="btn mt-6 md:mt-10">
                        <Link to="/products"
                              className="text-[#e9fafd] ml-5 no-underline bg-blue-600 hover:bg-[rgb(125,190,211)] rounded-[3px] text-lg sm:text-xl md:text-2xl lg:text-3xl px-3 py-1 font-changa transition duration-500 hover:border-b-6 hover:border-[#1ba1d2] hover:pt-1">
                            SHOP NOW
                        </Link>
                    </div>
                </div>
            </main>

            {/* Add the other components below the main section */}
            <div className={'mt-14  bg-white dark:bg-gradient-to-r from-gray-800 to-blue-700'}>
                <Products/>
            </div>
            <KeyHighlights/>
            <Testimonials/>
            <OurWork/>
        </div>
    );
}

export default HomePage;