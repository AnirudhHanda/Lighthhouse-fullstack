import React from 'react';

function StarRating({ rating }) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    return (
        <div className="flex">
            {[...Array(5)].map((_, index) => (
                <span key={index} className="text-yellow-400">
          {index < fullStars ? '★' : (hasHalfStar && index === fullStars ? '½' : '☆')}
        </span>
            ))}
        </div>
    );
}

export default StarRating;