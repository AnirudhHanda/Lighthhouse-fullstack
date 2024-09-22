import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useLocation} from 'react-router-dom';

const PRODUCTS_PER_PAGE = 4;

function Products() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const keyword = searchParams.get('keyword');


    useEffect(() => {
        // Fetch products based on the keyword (if present)
        const apiUrl = keyword
            ? `http://localhost:8080/api/v1/products/search?keyword=${keyword}`
            : 'http://localhost:8080/api/v1/products';

        axios.get(apiUrl)
            .then(response => {
                setProducts(response.data);

                // If navigating from search result click, scroll to the clicked product
                if (location.state && location.state.productId) {
                    const productElement = document.getElementById(location.state.productId);
                    if (productElement) {
                        productElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, [keyword, location.state]); // Include location.state in the dependency array


    // useEffect(() => {
    //     axios.get('http://localhost:8080/api/v1/products')
    //         .then(response => {
    //             setProducts(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching products:', error);
    //         });
    // }, []);

    const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
    const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="products pb-4 bg-white dark:bg-gradient-to-r from-gray-800 to-blue-700 justify-center content-center items-center place-content-center">
            <h2 className="text-3xl font-changa dark:text-gray-50 text-center mb-1 text-shadow">Featured Products</h2>
            <div className="border border-b-2 border-gray-400 mx-auto w-3/5"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 mx-auto md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12 px-4 sm:px-6 lg:px-8">
                {currentProducts.map(product => (
                    <div key={product.id}
                         className="item rounded-lg overflow-hidden shadow-lg dark:shadow-md dark:shadow-gray-800 p-4 w-64 sm:mx-0 transition-all bg-white dark:bg-gradient-to-r dark:from-blue-900 dark:to-blue-500 duration-500 hover:scale-105" // Adjusted width and added hover effect
                         onClick={() => {
                             window.location.href = `/product/${product.id}`;
                         }}
                    >
                        <div className="item_img overflow-hidden h-48 w-full mb-4">
                            <img
                                src={`data:${product.imageType};base64,${product.imageData}`}
                                alt={product.name}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="item_content text-left">
                            <p className="text-base font-sans font-bold leading-6 tracking-wide text-gray-800 dark:text-gray-100">
                                {product.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                                ~ {product.brand} {/* Display brand */}
                            </p>
                            <p className="text-lg font-semibold mt-2 text-[#1ba1d2] dark:text-blue-300"> {/* Added dark:text-blue-300 */}
                                ${product.price}
                            </p>
                            <div className="but text-center mt-4"> {/* Adjusted margin */}
                                <Link to={`/product/${product.id}`}
                                      className="text-[#e9fafd] no-underline bg-blue-600 hover:bg-[rgb(125,190,211)] rounded-[3px] text-sm px-3 py-1 font-changa transition duration-500 hover:border-b-[6px] hover:border-[#1ba1d2]">
                                    Buy Now
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                >
                    Previous
                </button>

                {[...Array(totalPages).keys()].map(pageNumber => (
                    <button
                        key={pageNumber + 1}
                        onClick={() => handlePageChange(pageNumber + 1)}
                        className={`bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded mx-1 ${
                            currentPage === pageNumber + 1 ? 'bg-blue-500 text-white' : ''
                        }`}
                    >
                        {pageNumber + 1}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>

        </div>
    );
}

export default Products;