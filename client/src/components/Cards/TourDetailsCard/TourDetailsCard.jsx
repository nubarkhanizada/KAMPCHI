import { Link } from "react-router-dom";
import "./tourdetailscard.scss";
import React, { useContext } from 'react'
import { SavedContext } from "../../../contexts/SavedContext";

const TourDetailsCard = ({ item }) => {
    const { saved, addToSaved, removeFromSaved } = useContext(SavedContext);

    const isSaved = saved.some(savedItem => savedItem.tourId === item.tourId);
    const saveHandler = () => {
        if (isSaved) {
            removeFromSaved(item.tourId);
        } else {
            addToSaved(item);
        }
    };

    return (
        <div className="tourDetailsCard">
            <div className="tourDetailsContent">
                <p className="tourDetailsTitle">{item.title}</p>
                <p className="tourDetailsLocation">{item.country}, {item.city}</p>
                <p className="tourDetailsShortDescription">{item.shortDescription}</p>
                <p className={item.isStocked === 1 ? 'stockSuccess' : 'stockError'} >{item.isStocked === 1 ? 'AVAILABLE' : 'NOT AVAILABLE'}</p>
                <p className='tourDetailsSave' onClick={saveHandler} >
                    <svg onClick={saveHandler} fill="none" height="32" role="img" viewBox="0 0 24 24" width="32"><polygon className={`${isSaved ? 'polygonSaved' : 'polygon'}`} style={{ fill: isSaved ? '#212121' : 'none' }} points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"></polygon></svg>
                </p>
            </div>
            <div className="tourDetailsAbout">
                <p className='tourDetailsCategory'>Category: <Link className="category" to={`/tour/category/${item.categoryId}`}>{item.name}</Link></p>
                <p className='tourDetailsGuide'>Tour Company: {item.fullname}</p>
                <details open className="descriptionDetails">
                    <summary>DESCRIPTION</summary>
                    <p className='tourDetailsLongDescription'>{item.longDescription}</p>
                </details>
                <details className="informationDetails">
                    <summary>ADDITIONAL INFORMATION</summary>
                    <p className='tourDetailsAdditionalInfo'><span>Instant Confirmation: </span>Receive your booking confirmation immediately after your purchase.</p>
                    <p className='tourDetailsAdditionalInfo'><span>Refund Policy: </span>If a ticket is returned or changed 96+ hours before service, 20% of the ticket price is charged.</p>
                    <p className='tourDetailsAdditionalInfo'><span>Still Have Questions: </span>Our customer support team is here to assist you hassle-free.</p>
                </details>
            </div>
        </div>
    )
}

export default TourDetailsCard