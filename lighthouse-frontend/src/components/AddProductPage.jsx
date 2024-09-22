import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProductPage() {
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        brand: "",
        description: "",
        price: "",
        category: "",
        stockQuantity: "",
        releaseDate: "",
        productAvailable: false,
    });

    const [image, setImage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct({
            ...product,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("file", image);
        formData.append(
            "product",
            new Blob([JSON.stringify(product)], { type: "application/json" })
        );

        try {
            await axios.post("http://localhost:8080/api/v1/product", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Product added successfully");
            alert("Product added successfully");
            navigate('/admin');
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Error adding product");
        }
    };

    return (
        <div className="container mx-auto p-8 pt-24">
            <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

            <form onSubmit={submitHandler} className="flex flex-col md:flex-row">
                {/* Left Column: Image Upload */}
                <div className="md:w-1/3 mb-4 md:mb-0 md:pr-4">
                    <label htmlFor="imageFile" className="block text-gray-700 text-sm font-bold mb-2">
                        Product Image
                    </label>
                    <input
                        type="file"
                        id="imageFile"
                        onChange={handleImageChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                    {image && (
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Selected"
                            className="mt-2 w-full h-48 object-cover rounded-lg"
                        />
                    )}
                </div>

                {/* Right Column: Product Details */}
                <div className="md:w-2/3">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={product.name}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={product.price}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={product.description}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="brand" className="block text-gray-700 text-sm font-bold mb-2">
                            Brand
                        </label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            value={product.brand}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
                            Category
                        </label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={product.category}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="productAvailable" className="block text-gray-700 text-sm font-bold mb-2">
                            In Stock
                        </label>
                        <input
                            type="checkbox"
                            id="productAvailable"
                            name="productAvailable"
                            checked={product.productAvailable}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="stockQuantity" className="block text-gray-700 text-sm font-bold mb-2">
                            Stock Quantity
                        </label>
                        <input
                            type="number"
                            id="stockQuantity"
                            name="stockQuantity"
                            value={product.stockQuantity}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="releaseDate" className="block text-gray-700 text-sm font-bold mb-2">
                            Release Date (dd/mm/yyyy)
                        </label>
                        <input
                            type="text" // You might want to use a date picker component for better UX
                            id="releaseDate"
                            name="releaseDate"
                            value={product.releaseDate}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddProductPage