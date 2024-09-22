import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Import FontAwesomeIcon
import
{ faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'; // Import icons

function AdminPage() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const handleAddNewProduct = () => {
        navigate('/admin/add-product'); // Navigate to AddProductPage
    };

    const handleEditProduct = (productId) => {
        console.log("id: "+productId)
        navigate(`/admin/edit-product/${productId}`); // Navigate to EditProductPage with productId
    };

    const handleDeleteProduct = async (productId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");

        if (confirmDelete)
        {
            try {
                await axios.delete(`http://localhost:8080/api/v1/product/${productId}`);

                // Update the product list after deletion (you might need to refetch from the backend)
                setProducts(products.filter(product => product.id !== productId));
                alert("Product deleted successfully!");
            } catch (error) {
                console.error('Error deleting product:', error);
                alert("Error deleting product. Please try again.");
            }
        }
    };
    return (
        <div className="products pb-4 bg-white dark:bg-gradient-to-r from-gray-800 to-blue-700">
            <h2 className="text-3xl font-changa text-center mb-1 text-shadow">Admin Dashboard</h2>
            <div className="border border-b-2 border-gray-400 mx-auto w-3/5"></div>

            {/* Add New Product Button */}
            <div className="flex justify-center mt-8">
                <button
                    onClick={handleAddNewProduct} // Attach onClick handler
                    className="bg-blue-500 dark:bg-blue- hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add New Product
                </button>
            </div>

            <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12 px-4 sm:px-6 lg:px-8">
                {products.map(product => (
                    <div key={product.id}
                         className="item rounded-lg shadow-lg dark:shadow-md dark:shadow-gray-800 overflow-hidden shadow-lg p-4 w-64 transition-all duration-500 hover:scale-105 mx-auto sm:mx-0">
                        <div className="item_img overflow-hidden h-48 w-full mb-4">
                            <img
                                src={`data:${product.imageType};base64,${product.imageData}`}
                                alt={product.name}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="item_content text-left">
                            <p className="text-base font-sans dark:text-gray-100 font-bold leading-6 tracking-wide text-gray-800">
                                {product.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                                ~ {product.brand}
                            </p>
                            <p className="text-lg font-semibold mt-2 text-[#1ba1d2] dark:text-blue-300"> {/* Added dark:text-blue-300 */}
                                ${product.price}
                            </p>

                            {/* Edit and Delete Buttons */}
                            <div className="flex mt-4 space-x-2">
                                <button
                                    onClick={() => handleEditProduct(product.id)} // Attach onClick handler
                                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded text-xs"
                                >
                                    <FontAwesomeIcon icon={faPenToSquare} className="mr-1" /> {/* Edit icon */}
                                </button>
                                <button
                                    onClick={() => handleDeleteProduct(product.id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded  
 text-xs"
                                >
                                    <FontAwesomeIcon icon={faTrash} className="mr-1" /> {/* Delete icon */}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default AdminPage;