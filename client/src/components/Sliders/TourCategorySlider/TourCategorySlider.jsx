import "./tourcategoryslider.scss";
import React from 'react'
import { Link } from 'react-router-dom';
import Slider from "react-slick";

const TourCategorySlider = ({ tourCategories }) => {
    const settings = {
        className: "toursCategorySlider",
        dots: true,
        infinite: true,
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 2500,
        pauseOnHover: true,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    autoplay: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    centerMode: true,
                    dots: false,
                    autoplay: true,
                    variableWidth: true,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    centerMode: true,
                    dots: false,
                    autoplay: true,
                    variableWidth: true,
                }
            }
        ]

    };

    return (
        <Slider {...settings}>
            {
                tourCategories && tourCategories.map(item => (
                    <Link className='category' key={item.id} to={`/tour/category/${item.id}`}>
                        <div className='categoryImg'>
                            <img src={item.image} alt={item.name} />
                            <p>{item.name}</p>
                        </div>
                    </Link>
                ))
            }
        </Slider>
    )
}

export default TourCategorySlider