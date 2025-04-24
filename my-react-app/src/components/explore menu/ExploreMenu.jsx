import React, { useContext } from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/frontend_assets/assets';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { StoreContext } from '../../context/StoreContext';

const ExploreMenu = ({ category, setCategory }) => {
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6, // Show more items by default
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1)",
        pauseOnHover: true,
        pauseOnFocus: true,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    const { food_list } = useContext(StoreContext);

    return (
        <div className='explore-menu-section py-12 px-4 bg-gradient-to-b from-white to-gray-50' id='explore-menu'>
            <div className='max-w-7xl mx-auto'>
                <div className='text-center mb-12'>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 explore-menu-text">
                        Explore Our <span className="text-orange-500">Delicious</span> Menu
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Choose from a diverse menu featuring a delectable array of dishes. Our mission is to 
                        satisfy your cravings with flavors that tantalize your taste buds.
                    </p>
                </div>

                <div className="menu-carousel-container relative">
                    {/* Gradient overlays */}
                    <div className="hidden md:block absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10"></div>
                    <div className="hidden md:block absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10"></div>
                    
                    <Slider {...settings} className="px-4">
                        {menu_list.map((item, index) => (
                            <div 
                                key={index} 
                                className="px-2 focus:outline-none"
                                onClick={() => setCategory(prev => prev === item.menu_name ? 'All' : item.menu_name)}
                            >
                                <div className={`explore-menu-item p-4 rounded-xl transition-all duration-300 ${category === item.menu_name ? 'bg-orange-50 border-2 border-orange-200' : 'hover:bg-gray-100'}`}>
                                    <div className="flex flex-col items-center">
                                        <div className={`menu-image-container mb-3 p-1 rounded-full ${category === item.menu_name ? 'ring-2 ring-orange-500' : ''}`}>
                                            <img 
                                                src={item.menu_image} 
                                                alt={item.menu_name} 
                                                className="w-20 h-20 object-cover rounded-full transition-transform duration-300 hover:scale-110 cursor-pointer"
                                            />
                                        </div>
                                        <p className="text-sm font-medium text-gray-700 mt-2">
                                            {item.menu_name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

                <div className="mt-8 mb-4">
                    <hr className="border-t-2 border-gray-200 opacity-30" />
                </div>
            </div>
        </div>
    );
};

export default ExploreMenu;