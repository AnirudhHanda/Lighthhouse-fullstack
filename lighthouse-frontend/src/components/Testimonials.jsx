import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Testimonials() {
    const testimonials = [
        {
            image: '/image/fridge.jpg',
            name: 'Glenn Peterson',
            content: 'Nice customer service along with good quality products. Satisfied with the service, good overall.'
        },
        {
            image: '/image/boat_1.png',
            name: 'Michael',
            content: 'User friendly interface with good products and recommendations.'
        },
        {
            image: '/image/laptop_purchased.jpg',
            name: 'Richard Cevin',
            content: 'Bought this laptop from Lighthouse, completely Satisfied with the service.'
        }
        // ... add more testimonials if needed
    ];

    return (
        <div className="testi p-4 ">
            <h2 className="text-3xl font-changa text-center my-1 dark:text-gray-50 text-shadow-md">Our Clients</h2>
            <div className="border_testi border-b-2 border-gray-400 mx-auto w-2/3 md:w-3/5"></div>
            <div className="testi_container rounded-lg mx-auto dark:text-gray-50 mt-6 px-4 sm:px-6 lg:px-8 w-full md:w-4/5 bg-white dark:bg-gradient-to-r dark:from-blue-900 dark:to-blue-500 duration-500">
                <Carousel
                    showArrows={true}
                    showStatus={false}
                    showThumbs={false}
                    infiniteLoop={true}
                    autoPlay={true}
                    interval={2000}
                    className="carousel-fade bg-white dark:text-gray-200 dark:bg-gradient-to-r dark:from-blue-900 dark:to-blue-500 duration-500"
                >
                    {testimonials.map((testimonial, index) => (
                        <div key={index}
                             className="item p-4 bg-white dark:bg-gradient-to-r dark:from-blue-900 dark:to-blue-500 duration-500 flex flex-col items-center"> {/* Added flex and items-center */}
                            <div
                                className="item_img w-24 h-24 mb-4 overflow-hidden rounded-full"> {/* Adjusted width and height, added overflow-hidden */}
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="item_content text-center"> {/* Centered content */}
                                <h3 className="text-xl font-changa">{testimonial.name}</h3> {/* Adjusted font size */}
                                <p className="text-base">{testimonial.content}</p>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}

export default Testimonials;