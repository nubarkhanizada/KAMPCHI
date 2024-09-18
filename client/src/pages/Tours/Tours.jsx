import "./tours.scss";
import React, { useEffect, useState } from 'react'
import { ReactComponent as PriceGuarantee } from "../../assets/TourFeatures/PriceGuarantee.svg";
import { ReactComponent as InstantComfirmation } from "../../assets/TourFeatures/InstantComfirmation.svg";
import { ReactComponent as OnlineSupport } from "../../assets/TourFeatures/OnlineSupport.svg";
import { ReactComponent as FlexiblePayment } from "../../assets/TourFeatures/FlexiblePayment.svg";
import { ReactComponent as Backroads } from "../../assets/GuideLogo/Backroads.svg";
import { ReactComponent as Intrepid } from "../../assets/GuideLogo/Intrepid.svg";
import { ReactComponent as MTSobek } from "../../assets/GuideLogo/MTSobek.svg";
import { ReactComponent as NatGeo } from "../../assets/GuideLogo/NatGeo.svg";
import { ReactComponent as Rei } from "../../assets/GuideLogo/Rei.svg";
import { ReactComponent as TrekTravel } from "../../assets/GuideLogo/TrekTravel.svg";
import services from '../../api/api';
import AllTourCategories from "../../components/AllTourCategories/AllTourCategories";
import TourCategorySlider from "../../components/Sliders/TourCategorySlider/TourCategorySlider";
import TourNewArrivalsSlider from "../../components/Sliders/TourNewArrivalsSlider/TourNewArrivalsSlider";
import BarLoader from 'react-spinners/BarLoader';

const Tours = () => {
    const [specificTourCategories, setSpecificTourCategories] = useState();
    const [recentTours, setRecentTours] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        try {
          await Promise.all([
            services.tourCategoryAPI.getSpecificTourCategories(setSpecificTourCategories),
            services.tourAPI.getRecentTours(setRecentTours)
          ]);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    if (loading) {
      return (
        <div className="loaderContainer">
          <BarLoader color="#212121" width="40%" height={6}/>
        </div>
      );
    }

    return (
        <div className='tourPage'>
            <section className='allCategoriesSection'>
                <div className='container'>
                    <AllTourCategories />
                </div>
            </section>
            <section className='aboutProductsSection'>
                <div className="container">
                    <div className="aboutProductsContent">
                        <h2>Discover Your Camping Adventure</h2>
                        <h4>Diverse Selection from Multiple Tour Companies</h4>
                        <h6>Explore a variety of camping tours offered by different tour companies. From guided hikes to mountain expeditions and beach getaways, find the perfect tour to suit your interests. Book your spot and embark on an unforgettable outdoor experience.</h6>
                    </div>
                    <div className='overlay'></div>
                </div>
            </section>
            <section className='toursPopularCategoriesSection'>
                <div className="container">
                    <h1>POPULAR CATEGORIES</h1>
                    {specificTourCategories && <TourCategorySlider tourCategories={specificTourCategories} />}
                </div>
            </section>
            <section className="popularSellersSection">
                <div className="container">
                    <div className="popularSellersContainer">
                        <h1>POPULAR TOUR COMPANIES</h1>
                        <div className="popularSellersLogoContainer">
                            <div className="popularSellersLogo">
                                <NatGeo />
                            </div>
                            <div className="popularSellersLogo">
                                <Intrepid />
                            </div>
                            <div className="popularSellersLogo">
                                <TrekTravel />
                            </div>
                            <div className="popularSellersLogo">
                                <Backroads />
                            </div>
                            <div className="popularSellersLogo">
                                <Rei />
                            </div>
                            <div className="popularSellersLogo">
                                <MTSobek />
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <section className='toursNewArrivalsSection'>
                <div className="container">
                    <div className="newArrivalsContainer">
                        <h1>UPCOMING ADVENTURES</h1>
                        {
                            recentTours && <TourNewArrivalsSlider recentTours={recentTours} />
                        }
                    </div>
                </div>
            </section>
            <section className="toursShoppingFeaturesSection">
                <div className="container">
                    <div className="shoppingFeaturesContainer">
                        <div className="shoppingFeatures">
                            <div className="featuresIcon instantComfirmation"><InstantComfirmation /></div>
                            <div className="featuresContent">
                                <h4>Instant Comfirmation</h4>
                                <p>Receive booking confirmation immediately.</p>
                            </div>
                        </div>
                        <div className="shoppingFeatures">
                            <div className="featuresIcon priceGuarantee"><PriceGuarantee /></div>
                            <div className="featuresContent">
                                <h4>Best Price Guarantee</h4>
                                <p>Always get the best price.</p>
                            </div>
                        </div>
                        <div className="shoppingFeatures">
                            <div className="featuresIcon onlineSupport"><OnlineSupport /></div>
                            <div className="featuresContent">
                                <h4>Online Support</h4>
                                <p>Hassle Free Customer Support</p>
                            </div>
                        </div>
                        <div className="shoppingFeatures">
                            <div className="featuresIcon flexiblePayment"><FlexiblePayment /></div>
                            <div className="featuresContent">
                                <h4>Flexible Payment</h4>
                                <p>Pay with Multiple Credit Cards.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Tours