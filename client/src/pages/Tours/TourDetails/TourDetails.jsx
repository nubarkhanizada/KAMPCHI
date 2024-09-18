import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import services from '../../../api/api';
import TourDetailsCard from '../../../components/Cards/TourDetailsCard/TourDetailsCard';
import moment from 'moment';
import Weather from '../../../components/Weather/Weather';
import { CartContext } from '../../../contexts/CartContext';
import BarLoader from 'react-spinners/BarLoader';

const TourDetails = () => {
  const [tour, setTour] = useState(null);
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTour = async () => {
      try {
        await services.tourAPI.getTourById(id, (data) => {
          if (data && data.length > 0) {
            setTour(data[0]);
          } else {
            setTour(null);
          }
          setLoading(false);
        });
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if (id) {
      getTour();
    }
  }, [id]);

  const cartHandler = async () => {
    if (tour.isStocked === 1) {
      addToCart(tour, "tour");
    }
  }

  // format date
  const formatDate = (dateStr) => {
    return moment(dateStr).format('DD.MM.YYYY');
  };

  const formattedStartDate = formatDate(tour && tour.startDate);
  const formattedEndDate = formatDate(tour && tour.endDate);

  return (
    <div className="tourDetailsPage">
      {loading ? (
        <div className="loaderContainer">
          <BarLoader color="#212121" width="50%" height={6} />
        </div>
      ) : (tour &&
        <div className="tourDetails">
          <div className="tourDetailsImage" style={{ backgroundImage: `url(${tour.tourImage})` }}></div>
          <div className="container">
            <div className="cardAndTicketAndWeather">
              <TourDetailsCard key={id} item={tour} />
              <div className="ticketAndWeather">
                <div className="tourDetailsTicket">
                  <p className="tourDetailsTicketTitle" >TICKET</p>
                  <p className='tourDetailsStarting'>Start time: {formattedStartDate}{`, ${tour.startTime.slice(0, 5)}`}</p>
                  <p className='tourDetailsEnding'>
                    {(tour.endDate || tour.endTime) ? `End time: ${tour.endDate ? formattedEndDate : ""}${tour.endDate && tour.endTime ? `, ${tour.endTime.slice(0, 5)}` : (tour.endTime ? tour.endTime.slice(0, 5) : "")}` : ""}
                  </p>
                  <p className="tourDetailsPrice">$ {tour.price}</p>
                  <div className="tourCardCart" onClick={tour.isStocked === 1 ? cartHandler : null} style={{ cursor: tour.isStocked === 1 ? 'pointer' : 'not-allowed' }}>
                    <p>{tour.isStocked === 1 ? 'ADD TO CART' : 'NOT AVAILABLE'}</p>
                  </div>
                </div>
                <div className="weather">
                  <Weather city={tour.city} />
                </div>
              </div>
            </div>
          </div>
          <div className="overlay"></div>
        </div>
      )}
    </div>
  )
}

export default TourDetails