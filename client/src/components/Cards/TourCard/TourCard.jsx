import "./tourcard.scss";
import { Link } from "react-router-dom";
import React, { useContext, useState } from 'react'
import { CiShoppingCart, CiEdit, CiTrash } from "react-icons/ci";
import services from "../../../api/api";
import { SavedContext } from "../../../contexts/SavedContext";
import TourEditModal from "../../Modals/TourEditModal/TourEditModal";
import { CartContext } from "../../../contexts/CartContext";

const TourCard = ({ tourId, title, shortDescription, price, formattedStartDate, formattedEndDate, startTime, endTime, isStocked, country, city, tourImage, name, tourOwnerId }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userRoleId = user ? user.userRoleId : null;
    const userId = user ? user.userId : null;
    const { saved, addToSaved, removeFromSaved } = useContext(SavedContext);
    const { addToCart } = useContext(CartContext);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const isSaved = saved.some((item) => item.tourId === tourId);

    const cartHandler = () => {
        if (isStocked === 1) {
            addToCart({ tourId, tourImage, title, price, isStocked }, "tour");
        }
    };

    const saveHandler = () => {
        if (isSaved) {
            removeFromSaved(tourId);
        } else {
            addToSaved({ tourId, title, shortDescription, price, formattedStartDate, formattedEndDate, startTime, endTime, isStocked, country, city, tourImage, name, tourOwnerId });
        }
    };

    const editHandler = () => {
        setEditModalOpen(true);
    };

    const deleteHandler = () => {
        services.tourAPI.deleteTourById(tourId);
    };

    return (
        <div className="tourCard">
            <Link className="tourCardImg" to={`/tour/details/${tourId}`}>
                <img src={tourImage} alt={title} />
            </Link>
            <div className="content">
                <div className="tourCardContent">
                    <div className="categoryLocation">
                        <p className='tourCardCategory'>{name}</p>
                        <p className='tourCardLocation'>{country}, {city}</p>
                    </div>
                    <p className='tourCardTitle'>{title}
                        <svg onClick={saveHandler} fill="none" height="32" role="img" viewBox="0 0 24 24" width="32"><polygon className={`${isSaved ? 'polygonSaved' : 'polygon'}`} style={{ fill: isSaved ? '#212121' : 'none' }} points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"></polygon></svg>
                    </p>
                    <p className='tourCardShortDescription'>{shortDescription}</p>
                </div>
                <div className="tourCardTime">
                    <p className='tourCardStarting'>Start time: {formattedStartDate}{startTime ? `, ${startTime.slice(0, 5)}` : ''}</p>
                    <p className='tourCardEnding'>
                        {formattedEndDate && endTime ?
                            `End time: ${formattedEndDate}, ${endTime}` :
                            (formattedEndDate ? `End time: ${formattedEndDate}` :
                                (endTime ? `End time: ${endTime}` : ''))
                        }
                    </p>
                </div>
                <div className="tourCardPriceCart">
                    <p className='tourCardPrice'>$ {price}</p>
                    <div className="tourCardCart" style={{ cursor: isStocked === 1 ? 'pointer' : 'not-allowed' }} onClick={cartHandler}>
                        <CiShoppingCart />
                        <p>{isStocked === 1 ? 'ADD TO CART' : 'NOT AVAILABLE'}</p>
                    </div>
                </div>
                <div className={`tourCardEditDeleteIcon ${userRoleId === 2 && userId === tourOwnerId ? 'showForOwner' : ''}`}>
                    <CiEdit className="edit" onClick={() => editHandler(tourId)} />
                    <CiTrash className="trash" onClick={() => deleteHandler(tourId)} />
                </div>
                <TourEditModal isOpen={isEditModalOpen} onRequestClose={() => setEditModalOpen(false)} tourId={tourId} />
            </div>
        </div>
    )
}

export default TourCard