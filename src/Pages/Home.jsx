import React from 'react';
import { Carousel } from 'react-bootstrap';
import FoodImage2 from '/food2.jpg'; // Replace with actual paths
import FoodImage4 from '/food4.jpg'; // Replace with actual paths
import FoodImage5 from '/food5.jpg'; // Replace with actual paths
import Recipes from '../Components/Recipes';


export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black to-white flex flex-col items-center justify-between">

            <div className="mt-8">
                <Carousel interval={2000} controls={false} indicators={false} style={{ width: '400px', height: '400px' }}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 rounded shadow-md"
                            src={FoodImage2}
                            alt="Second slide"
                            style={{ width: '400px', height: '400px', objectFit: 'cover' }}
                        />
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 rounded shadow-md"
                            src={FoodImage4}
                            alt="Fourth slide"
                            style={{ width: '400px', height: '400px', objectFit: 'cover' }}
                        />
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 rounded shadow-md"
                            src={FoodImage5}
                            alt="Fifth slide"
                            style={{ width: '400px', height: '400px', objectFit: 'cover' }}
                        />
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className='mt-8 flex-grow'>
                <p className='text-center m-4 font-bold text-white bg-gradient-to-br from-red-700 to-black rounded-lg p-4 md:text-sm lg:w-3/4 mx-auto'>All global uploaded Recipes are found here in the home page, although the main idea of this App is to have your own uploaded recipes for travelling, but feel free to share your recipes to the world</p>


                <Recipes />
            </div>
        </div>
    );
}
