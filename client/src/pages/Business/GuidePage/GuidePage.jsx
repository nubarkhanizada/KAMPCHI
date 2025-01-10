import './guidepage.scss';
import React, { useEffect, useState } from 'react'
import services from '../../../api/api';
import TourCard from '../../../components/Cards/TourCard/TourCard';
import TourCreateForm from '../../../components/Forms/TourCreateForm/TourCreateForm';
import moment from 'moment';
import BarLoader from 'react-spinners/BarLoader';

const GuidePage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userID = user ? user.userId : null;
    const [tours, setTours] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        try {
          await Promise.all([
            services.tourAPI.getToursByUserId(userID, setTours)
          ]);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [tours, userID]);
  
    if (loading) {
      return (
        <div className="loaderContainer">
          <BarLoader color="#212121" width="40%" height={6}/>
        </div>
      );
    }

    // Format date
    const formatDate = (dateStr) => {
        const date = moment(dateStr);
        return date.isValid() ? date.format('DD.MM.YYYY') : '';
    };

    // Format time
    const formatTime = (timeStr) => {
        return timeStr ? timeStr.slice(0, 5) : '';
    };

    return (
        <div className="container">
            <div className="sellerPage guidePage">
                <div className="creatingSection">
                    <TourCreateForm />
                </div>
                <div className="productsSection">
                    {tours && tours.length > 0 && <div className="yourProducts">YOUR TOURS ({tours.length})</div>}
                    {tours === undefined ? (
                        <div>Loading...</div>
                    ) : tours.length > 0 ? (
                        <div className="productsContainer">
                            {tours.map(item => (
                                <TourCard
                                    key={item.tourId}
                                    tourId={item.tourId}
                                    title={item.title}
                                    shortDescription={item.shortDescription}
                                    price={item.price}
                                    formattedStartDate={formatDate(item.startDate)}
                                    formattedEndDate={formatDate(item.endDate)}
                                    startTime={formatTime(item.startTime)}
                                    endTime={formatTime(item.endTime)}
                                    isStocked={item.isStocked}
                                    country={item.country}
                                    city={item.city}
                                    tourImage={item.tourImage}
                                    name={item.name}
                                    tourOwnerId={item.userId}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="productsSectionImage">
                            <img src="https://cdn2.iconfinder.com/data/icons/notional-illustrations/1000/finance___financial_man_people_person_coin_investment_savings_increase_arrow-512.png" alt="No products" />
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default GuidePage