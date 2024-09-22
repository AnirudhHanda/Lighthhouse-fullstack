import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import StarRating from "./StarRating.jsx";

function ProductPage() {
    const    { productId } = useParams();
    const navigate = useNavigate(); // For navigation
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`http://localhost:8080/api/v1/product/${productId}`)
            .then(response => {
                setProduct(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error);
                setIsLoading(false);
            });
    }, [productId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="container bg-white dark:bg-gradient-to-r from-gray-800 to-blue-700 mx-auto p-4 pt-20"> {/* Adjusted padding for smaller screens */}
            <h1 className="text-2xl md:text-3xl dark:text-gray-50 font-bold mb-4">   </h1> {/* Adjusted heading size */}
            <div className="flex flex-col md:flex-row"> {/* Stack on small screens, flex on medium and larger */}
                <div className="md:w-1/2 w-full mb-4 md:mb-0"> {/* Full width on small screens */}
                    <img
                        src={`data:${product.imageType};base64,${product.imageData}`}
                        alt={product.name}
                        className="w-full h-auto rounded-lg"
                    />
                </div>
                <div className="md:w-1/2 md:pl-8">
                    {/* Product Details Section */}
                    <div className="border-b border-gray-300 pb-1 mb-5">
                        <h1 className="text-2xl dark:text-gray-50 font-semibold font-changa mb-2">{product.name}</h1>
                    </div>
                    <div className="border-b border-gray-300 pb-4 mb-4">
                        <p className="text-gray-600 dark:text-gray-400 text-sm">~ {product.brand}</p>


                            <p className="text-2xl font-semibold mt-2 text-[#1ba1d2] dark:text-blue-300"> {/* Added dark:text-blue-300 */}
                                <span className="text-sm text-[#1ba1d2] dark:text-blue-300">$</span>
                                {product.price}
                            </p>
                            <p className="mt-4 text-gray-700 dark:text-gray-100">{product.description}</p>
                    </div>
                    <div className="border-b border-gray-300 pb-4 mb-4">
                        <p className="mt-2 text-gray-600 dark:text-gray-400">{product.date}</p>
                    </div>

                    {/* Stock and Rating Section */}
                    <div
                        className="border-b border-gray-300 pb-4 mb-4 flex md:justify-between flex-col md:flex-row"> {/* Stack on small screens */}
                        <div
                            className="flex flex-col md:flex-row md:items-center mb-2 md:mb-0"> {/* Stack on small, align on medium */}
                            <p className={`text-sm ${product.inStock ? 'text-green-600 dark:text-green-200' : 'text-red-600 dark:text-red-200'}`}>
                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </p>
                            <div className="bg-blue-200 text-gray-900 rounded-full px-3 py-1 text-sm mt-2 md:mt-0 md:ml-2">
                                Stock: {product.stock}
                            </div>
                        </div>
                        <div className="flex items-center">
                            <p className="text-gray-600 dark:text-gray-100 text-sm mr-2">Rating: {product.rating}</p>
                            <StarRating rating={product.rating}/>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex mt-4 space-x-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Add to Cart
                        </button>
                        <button
                            onClick={() => navigate(`/product/${productId}/review`)}

                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Post Review
                        </button>
                    </div>

                    {/* Reviews Section */}
                    <div>
                        <h2 className="text-2xl dark:text-white font-semibold mt-6">Reviews</h2>
                        {product.reviews.map(review => (
                            <div key={review.id} className="border dark:text-gray-100 p-4 rounded-lg my-2">
                                <h3 className="font-bold">{review.title}</h3>
                                <p>{review.content}</p>
                                <p className="text-gray-500 dark:text-gray-300 text-sm">By {review.author} on {review.date}</p>
                            </div>
                        ))}
                    </div>


                </div>
            </div>
        </div>
    );
}

export default ProductPage;
