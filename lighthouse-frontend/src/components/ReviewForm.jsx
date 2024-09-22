import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ReviewForm() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [stars, setStars] = useState(0);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus(null);

        try {
            const reviewData = {
                title,
                content,
                author,
                date: new Date().toISOString().slice(0, 10),
                stars
            };

            await axios.post(`http://localhost:8080/api/v1/product/${productId}/review`, reviewData);

            setSubmitStatus('success');
            setTimeout(() => {
                navigate(`/product/${productId}`);
            }, 1500);
        } catch (error) {
            console.error('Error submitting review:', error);
            setSubmitStatus('error');
        }
    };

    const handleStarClick = (selectedStars) => {
        setStars(selectedStars);
    };

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
            <form onSubmit={handleSubmit}>
                {/* ... input fields for title, content, and author */}
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                        Title
                    </label>
                    <input

                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3  
 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="content"
                           className="block text-gray-700 text-sm font-bold mb-2">
                        Content
                    </label>
                    <textarea

                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none  
 focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="author"
                           className="block text-gray-700 text-sm font-bold mb-2">
                        Author
                    </label>
                    <input
                        type="text"
                        id="author"
                        value={author}

                        onChange={(e) => setAuthor(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none  
 focus:shadow-outline"

                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Rating
                    </label>
                    <div className="flex">
                        {[...Array(5)].map((_, index) => (
                            <span
                                key={index}
                                onClick={() => handleStarClick(index + 1)}
                                className={`cursor-pointer text-2xl ${
                                    index < stars ? 'text-yellow-500' : 'text-gray-300'
                                }`}
                            >
                ★
              </span>
                        ))}
                    </div>
                </div>

                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Submit Review
                </button>
            </form>

            {submitStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4"
                     role="alert">
                    <span className="block sm:inline">Review added successfully!</span>
                </div>
            )}
            {submitStatus === 'error' && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
                     role="alert">
                    <span className="block sm:inline">Error submitting review. Please try again.</span>
                </div>
            )}
        </div>
    );
}

export default ReviewForm;