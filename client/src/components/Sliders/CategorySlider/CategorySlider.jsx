import React from 'react'
import { Link } from "react-router-dom";
import { RiArrowLeftWideFill, RiArrowRightWideFill } from 'react-icons/ri';
import "./categoryslider.scss";
import Slider from "react-slick";

const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div className={className} style={{ ...style, display: "block" }} onClick={onClick}><RiArrowRightWideFill />
        </div>
    );
};

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div className={className} style={{ ...style, display: "block" }} onClick={onClick}><RiArrowLeftWideFill />
        </div>
    );
};

const CategorySlider = ({ categories }) => {
    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 2500,
        pauseOnHover: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 3
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };

    return (
        <Slider {...settings}>
            {
                categories && categories.map(item => (
                    <Link className='category' key={item.id} to={`/category/${item.id}`}>
                        <div className='categoryImg'>
                            <img src={item.image} alt={item.name} />
                        </div>
                        <p>{item.name}</p>
                    </Link>
                ))
            }
        </Slider>
    )
}

export default CategorySlider