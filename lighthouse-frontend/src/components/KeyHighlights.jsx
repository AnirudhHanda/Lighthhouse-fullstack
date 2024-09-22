import React from 'react';

function KeyHighlights() {
    return (
        <div className="key_highlights p-4 dark:!bg-navy-900">
            <h2 className="text-3xl font-changa dark:text-gray-50 text-center my-6 text-shadow-md">Our Key Highlights</h2>
            <div className="border_key border-b-2 border-gray-400 mx-auto w-2/3 md:w-3/5"></div>
            <div className="key_container flex flex-col-reverse md:flex-row mt-8"> {/* Reversed order for mobile */}
                {/* Image on left for mobile */}
                <div className="key_img md:w-1/2 order-1 md:order-2 md:pl-4 flex items-center justify-center">
                    <img src="/image/vector_1.png" alt="shopping_vector" className="w-full md:w-auto" />
                </div>
                <div className="key_content text-2xl dark:text-gray-200 md:w-1/2 order-2 md:order-1 p-4">
                    <ul>
                        <li className="shadow-md mb-2 border-l-2 border-blue-500 pl-2 my-2">Customer satisfaction is our priority.</li>
                        <li className="shadow-md mb-2 border-l-2 border-blue-500 pl-2 my-2">Family of more than 1 Lakh Customers.</li>
                        <li className="shadow-md mb-2 border-l-2 border-blue-500 pl-2 my-2">More than 20k reviews.</li>
                        <li className="shadow-md mb-2 border-l-2 border-blue-500 pl-2 my-2">Satisfying After Service.</li>
                        <li className="shadow-md mb-2 border-l-2 border-blue-500 pl-2 my-2">Quality and Tested Products.</li>
                        <li className="shadow-md mb-2 border-l-2 border-blue-500 pl-2 my-2">User friendly and no Ads recommendations.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default KeyHighlights;
