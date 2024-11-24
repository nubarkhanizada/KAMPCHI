import "./tournewarrivalsslider.scss";
import React from 'react'
import Slider from "react-slick";
import TourCard from "../../Cards/TourCard/TourCard";
import moment from 'moment';

const TourNewArrivalsSlider = ({ recentTours }) => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    // format date
    const formatDate = (dateStr) => {
        const date = moment(dateStr);
        return date.isValid() ? date.format('DD.MM.YYYY') : '';
    };

    return (
        <Slider {...settings}>
            {recentTours && recentTours.map(item => {
                const formattedStartDate = formatDate(item.startDate);
                const formattedEndDate = formatDate(item.endDate);
                const startTime = item.startTime ? item.startTime.slice(0, 5) : '';
                const endTime = item.endTime ? item.endTime.slice(0, 5) : '';

                return (
                    <TourCard
                        key={item.tourId}
                        tourId={item.tourId}
                        title={item.title}
                        shortDescription={item.shortDescription}
                        price={item.price}
                        formattedStartDate={formattedStartDate}
                        formattedEndDate={formattedEndDate}
                        startTime={startTime}
                        endTime={endTime}
                        isStocked={item.isStocked}
                        country={item.country}
                        city={item.city}
                        tourImage={item.tourImage}
                        name={item.name}
                        tourOwnerId={item.userId}
                    />
                );
            })}
        </Slider>
    )
}

export default TourNewArrivalsSlider