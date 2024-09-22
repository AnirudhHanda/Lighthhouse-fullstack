import React from 'react';

function OurWork() {
    return (
        <div className="our_work p-10">
            <h2 className="text-3xl font-changa dark:text-gray-50 text-center my-3 text-shadow-md">Our Work</h2>
            <div className="border_work border-b-2 border-gray-400 mx-auto w-2/3 md:w-3/5"></div>
            <div className="work_container dark:text-gray-50 flex flex-col-reverse md:flex-row mt-6"> {/* Reversed order for mobile */}
                {/* Content on left for mobile */}
                <div className="work_content dark:text-gray-200 md:w-2/5 p-4 md:ml-14 mt-4 md:mt-0 order-1 md:order-2">
                    <p className="text-lg text-gray-800 dark:text-gray-200 font-serif">
                        Subject to provide good Service with quality products, Our team is working day and night to give a user-friendly environment to all the clients.
                        Assured after service with Doorstep delivery options provided, users can get the facilities of lighthouse from a click.
                    </p>
                    <p className="text-lg text-gray-800 dark:text-gray-200 font-serif mt-4">
                        Abide to Covid-19 guidelines, all services are provided with safety precautions.
                        Multiple payment options available to maintain a distant relation    with customers.
                        24X7 Contact and query options available.
                        Our team is for your service and customer satisfaction.
                    </p>
                </div>
                <div className="work_video md:w-1/2 order-2 md:order-1 p-4">
                    <video controls autoPlay loop muted className="w-full rounded-lg border-2 border-blue-500">
                        <source src="/image/Promotion.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>
        </div>
    );
}

export default OurWork;
