import { Link, useParams } from "react-router-dom";
import "././tourscategory.scss";
import React, { useEffect, useState } from 'react'
import services from "../../../api/api";
import AllTourCategories from "../../../components/AllTourCategories/AllTourCategories";
import TourCard from "../../../components/Cards/TourCard/TourCard";
import moment from 'moment';
import TourSearchForm from "../../../components/Forms/SearchForms/TourSearchForm";
import FilterTours from "../../../components/FilterTours/FilterTours";
import BarLoader from 'react-spinners/BarLoader';

const TourCategory = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [tours, setTours] = useState();
  const [visibleTours, setVisibleTours] = useState(9);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchData = async () => {
          try {
              await Promise.all([
                services.tourCategoryAPI.getTourCategories(setCategories),
                services.tourAPI.getToursByCategoryId(id, setTours)
              ]);
          } finally {
              setLoading(false);
          }
      };

      fetchData();
  }, [id]);

  if (loading) {
      return (
          <div className="loaderContainer">
              <BarLoader color="#212121" width="40%" height={6} />
          </div>
      );
  }

  const loadMore = () => {
    setVisibleTours(prev => prev + 9);
  };

  // format date
  const formatDate = (dateStr) => {
    const date = moment(dateStr);
    return date.isValid() ? date.format('DD.MM.YYYY') : '';
  };


  const selectedCategory = categories.find(selectedCategory => String(selectedCategory.id) === id);

  return (
    <div className="tourCategoryPage">
      <section className='allTourCategoriesSection'>
        <div className='container'>
          <AllTourCategories />
        </div>
      </section>
      <section className="aboutTourCategorySection" style={{ backgroundImage: `url(${selectedCategory?.image || ''})` }}>
        <div className="container">
          <div className="aboutTourCategoryContent">
            <Link to={'/tours'}>Tours ﹥</Link><span>{selectedCategory?.name}</span>
            <h1>{selectedCategory?.name}</h1>
            <p>{selectedCategory?.description}</p>
          </div>
        </div>
        <div className="overlay"></div>
      </section>
      <section className="searchAndFilterSection">
        <div className="container">
          <div className="searchAndFilterContainer">
            {tours && tours.length > 1 &&
              <h1>{`Showing ${tours.length} results`}</h1>
            }
            {tours && tours.length === 1 &&
              <h1>{`Showing ${tours.length} result`}</h1>
            }
            {tours && tours.length === 0 &&
              <h1>Category is empty</h1>
            }
            <TourSearchForm />
            <div className="tourCategoryFilter">
              <FilterTours setTours={setTours} />
            </div>
          </div>
        </div>
      </section>
      <section className="filteredToursSection">
        <div className="container">
          <div className="filteredToursContainer">
            <div className="filteredToursCardContainer">
              {tours && tours.slice(0, visibleTours).map(item => {
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
            </div>
            {tours && visibleTours < tours.length && (
              <div className="loadMore" onClick={loadMore}>
                <span>LOAD MORE</span>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default TourCategory