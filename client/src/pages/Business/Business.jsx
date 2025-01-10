import "./business.scss";
import React from 'react'
import { Link } from "react-router-dom";

const Business = () => {
    return (
        <div className="container">
            <div className="businessPage">
                <h1>Collaborate with KAMPCHI</h1>
                <h2>to Build Your Business</h2>
                <p>You can complete your application quickly by choosing your business type.</p>
                <div className="businessCardsContainer">
                    <div className="businessCard businessForSellers">
                        <h3>FOR PRODUCT SELLERS</h3>
                        <p>Join us now to showcase your products to camping and nature enthusiasts! List your items on our platform and reach a wide audience quickly and efficiently!</p>
                        <Link to={'/business/seller/register'} >REGISTER</Link>
                    </div>
                    <div className="businessCard businessForGuides">
                        <h3>FOR TOUR COMPANIES</h3>
                        <p>Join us now to promote your camping tours to an eager audience! List your adventures on our platform and attract nature enthusiasts quickly and efficiently!</p>
                        <Link to={'/business/guide/register'}>REGISTER</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Business