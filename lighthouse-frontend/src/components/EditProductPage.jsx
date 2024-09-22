import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function
EditProductPage() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [productData, setProductData] = useState({
        name: '',
        price: '',
        description: '',
        brand: '',
        category: '',
        inStock: true,
        stock: '',
        date: '',
        rating: 0,
        reviews: []
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [productImage, setProductImage] = useState(null);


    useEffect(() => {
        setIsLoading(true);

        // Fetch product details
        axios.get(`http://localhost:8080/api/v1/product/${productId}`)
            .then(response => {
                setProductData(response.data);
                setIsLoading(false);

                // Fetch product image (assuming you have a separate endpoint for this)
                axios.get(`http://localhost:8080/api/v1/product/${productId}/image`, { responseType: 'blob' })
                    .then(imageResponse => {
                        setProductImage(URL.createObjectURL(imageResponse.data));
                    })
                    .catch(imageError => {
                        console.error('Error fetching product image:', imageError);
                        // Handle image fetch error if needed
                    });
            })
            .catch(error => {
                setError(error);
                setIsLoading(false);
            });
    }, [productId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProductData({ ...productData, [name]: type === 'checkbox' ? checked : value });
    };

    const
        handleImageChange = (e) => {
            setSelectedImage(e.target.files[0]);
        };

    const [updateStatus, setUpdateStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", selectedImage);
        formData.append(

            "product",
            new Blob([JSON.stringify(productData)], { type: "application/json" })
        );

        try {
            await axios.put(`http://localhost:8080/api/v1/product`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setUpdateStatus('success'); // Set success status
            setTimeout(() => {
                navigate('/admin');
            }, 1500); // Delay navigation to show the message
        } catch (error) {
            console.error('Error updating product:', error);
            setUpdateStatus('error');
            // Handle error (e.g., display an error message)
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }


    return (

        <div className="container mx-auto p-8 pt-24">
            {/* Display success or error message */}
            {updateStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4" role="alert">
                    <span className="block sm:inline">Product
 updated successfully!</span>
                </div>
            )}
            {updateStatus === 'error' && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
                    <span className="block  
 sm:inline">Error updating product. Please try again.</span>
                </div>
            )}
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row">
                {/* Left Column: Image Upload */}
                <div className="md:w-1/3 mb-4 md:mb-0 md:pr-4">
                    <label htmlFor="file" className="block text-gray-700 text-sm font-bold mb-2">
                        Product Image
                    </label>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        onChange={handleImageChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none
 focus:shadow-outline"
                    />


                    <div className="mt-2 relative">
                        <img
                            src={selectedImage ? URL.createObjectURL(selectedImage) : `data:${productData.imageType};base64,${productData.imageData}`}
                            alt={productData.name}
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        {!selectedImage && ( // Show overlay only if no new image is selected
                            <div
                                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                                <p className="text-white text-sm">Keep existing image or select a new one!</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Product Details */}
                <div className="md:w-2/3">
                    {/* Input fields for name, price, description, brand, category, inStock, and stock */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={productData.name}

                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  
 focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700  
 text-sm font-bold mb-2">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={productData.price}

                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  
 focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700  
 text-sm font-bold mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={productData.description}
                            onChange={handleChange}
                            className="shadow  
 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="brand"
                               className="block text-gray-700 text-sm font-bold mb-2">
                            Brand
                        </label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            value={productData.brand}

                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none  
 focus:shadow-outline"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="category"
                               className="block text-gray-700 text-sm font-bold mb-2">
                            Category
                        </label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={productData.category}

                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  
 focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="inStock"
                               className="block text-gray-700 text-sm font-bold mb-2">
                            In Stock
                        </label>
                        <input
                            type="checkbox"
                            id="inStock"
                            name="inStock"
                            checked={productData.inStock}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="stock" className="block text-gray-700 text-sm font-bold mb-2">
                            Stock
                        </label>
                        <input
                            type="number"
                            id="stock"
                            name="stock"

                            value={productData.stock}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none  
 focus:shadow-outline"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="date" className="block text-gray-700  
 text-sm font-bold mb-2">
                            Date (dd/mm/yyyy)
                        </label>
                        <input
                            type="text"
                            id="date"
                            name="date"
                            value={productData.date}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  
 focus:outline-none focus:shadow-outline"

                            required
                        />
                        <div className="mb-4">
                            <label htmlFor="id" className="block text-gray-700 text-sm font-bold mb-2">
                                ID (Non-editable)
                            </label>
                            <input
                                type="text"
                                id="id"
                                name="id"
                                value={productData.id}
                                disabled
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none  
 focus:shadow-outline bg-gray-100"
                            />
                        </div>


                        <button type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                            Update Product
                        </button>
                    </div>
                </div>
            </form>
            {/* Display success or error message */}
            {updateStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4" role="alert">
                    <span className="block sm:inline">Product  
 updated successfully!</span>
                </div>
            )}
            {updateStatus === 'error' && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
                    <span className="block
 sm:inline">Error updating product. Please try again.</span>
                </div>
            )}
        </div>
    );
}

export default EditProductPage;