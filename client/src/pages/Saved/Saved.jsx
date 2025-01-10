import "./saved.scss";
import React, { useContext } from 'react'
import { SavedContext } from "../../contexts/SavedContext";
import { Link } from "react-router-dom";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import TourCard from "../../components/Cards/TourCard/TourCard";

const Saved = () => {
    const { saved } = useContext(SavedContext)

    return (
        <div className="savedPage">
            <div className="container">
                <div className="savedContainer">
                    {saved && saved.length > 0 && <h1>SAVED ({saved.length})</h1>}
                    <div className="savedCardContainer">
                        {saved && saved.length > 0
                            ? saved.map(item => {
                                return (
                                    <TourCard
                                        key={item.tourId}
                                        tourId={item.tourId}
                                        title={item.title}
                                        shortDescription={item.shortDescription}
                                        price={item.price}
                                        formattedStartDate={item.formattedStartDate}
                                        formattedEndDate={item.formattedEndDate}
                                        startTime={item.startTime}
                                        endTime={item.endTime}
                                        isStocked={item.isStocked}
                                        country={item.country}
                                        city={item.city}
                                        tourImage={item.tourImage}
                                        name={item.name}
                                        tourOwnerId={item.userId} />
                                )
                            })
                            :
                            <div className='emptyFavoritesPage'>
                                <div className="emptyFavoritesPageImage">
                                    <img src="https://cdn2.iconfinder.com/data/icons/notional-illustrations/1000/travel___camping_log_outdoors_wood_cook_cooking_food_man_people-512.png" alt="empty saved" />
                                </div>
                                <p>YOUR SAVED LIST IS AS EMPTY AS A TENT WITHOUT CAMPERS :)</p>
                                <Link to={"/tours"}><HiOutlineArrowLongLeft />EXPLORE CAMPING TOURS</Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Saved