import "./homeslider.scss";
import React from 'react';
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeSlider = () => {

    const settings = {
        fade: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false,
        autoplay: true,
        autoplaySpeed: 4500,
        pauseOnHover: true,
        focusOnSelect: true,
    };

    return (
        <div className="sliderContainer">
            <Slider {...settings}>
                <section className="sliderAbout">
                    <div className="sliderAboutBackgroundContainer">
                    </div>
                    <div className="sliderAboutTextContainer">
                        <div className="sliderAboutTitle">
                            <h6>Back to Nature With Us</h6>
                        </div>
                        <div className="sliderAboutText">
                            <p>Take only memories, leave only footprints.</p>
                        </div>
                        <div className="sliderAboutButton">
                            <Link to="/about">ABOUT US</Link>
                        </div>
                    </div>
                    <div className='overlay'></div>
                </section>
                <section className="sliderProducts">
                    <div className="sliderProductsBackgroundContainer">
                    </div>
                    <div className="sliderProductsTextContainer">
                        <div className="sliderProductsTitle">
                            <h6>Adventure-Ready Gear</h6>
                        </div>
                        <div className="sliderProductsText">
                            <p>Gear up for your next outdoor journey.</p>
                        </div>
                        <div className="sliderProductsButton">
                            <Link to="/products">SHOP NOW</Link>
                        </div>
                    </div>
                    <div className='overlay'></div>
                </section>
                <section className="sliderTours">
                    <div className="sliderToursBackgroundContainer">
                    </div>
                    <div className="sliderToursTextContainer">
                        <div className="sliderToursTitle">
                            <h6>Camping & Adventure</h6>
                        </div>
                        <div className="sliderToursText">
                            <p>The right tour for the right traveler.</p>
                        </div>
                        <div className="sliderToursButton">
                            <Link to="/tours">DISCOVER MORE</Link>
                        </div>
                    </div>
                    <div className='overlay'></div>
                </section>
            </Slider>
        </div>
    );
}

export default HomeSlider;