import React, { useState } from 'react'
import services from '../../../api/api';
import { CiSearch } from 'react-icons/ci';
import { Link } from 'react-router-dom';

const TourSearchForm = () => {
    const [tours, setTours] = useState()
    const [searchPerformed, setSearchPerformed] = useState(false);

    const searchHandler = (e) => {
        if (e.target.value.trim() !== "") {
            services.tourAPI.searchTours(e.target.value, setTours)
            setSearchPerformed(true);
        }
        else {
            setTours(null)
            setSearchPerformed(false);
        }
    }

    return (
        <div className="productCategorySearch">
            <input onChange={searchHandler} type="text" placeholder="Search all tours..." />
            <button type="button" ><CiSearch /></button>
            {searchPerformed && (tours && tours.length > 0 ? (
                <div className="productCategorySearchItems">
                    {tours.map(item => (
                        <div className='searchResults' key={item.tourId}>
                            <Link className='searchResultsItem' onClick={() => setTours(null)} to={`/tour/details/${item.tourId}`}>
                                <div className="searchResultImage">
                                    <img style={{ height: "70px" }} src={item.tourImage} alt={item.title} />
                                </div>
                                <div className="searchImageContent">
                                    <p>{item.title}</p>
                                    <p>$ {item.price}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="productCategorySearchItems emptySearchItems">
                    <div className="searchResults">
                        <div className='searchResultsItem'>
                            No results found for your query. Please try again.
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default TourSearchForm