import "./products.scss";
import React, { useEffect, useState } from 'react'
import { ReactComponent as Decathlon } from "../../assets/SellerLogo/Decathlon.svg";
import { ReactComponent as Columbia } from "../../assets/SellerLogo/Columbia.svg";
import { ReactComponent as JackWolfskin } from "../../assets/SellerLogo/JackWolfskin.svg";
import { ReactComponent as Dometic } from "../../assets/SellerLogo/Dometic.svg";
import { ReactComponent as Alpinist } from "../../assets/SellerLogo/Alpinist.svg";
import { ReactComponent as Yonja } from "../../assets/SellerLogo/Yonja.svg";
import { ReactComponent as MoneyGuarantee } from "../../assets/ProductFeatures/MoneyGuarantee.svg";
import { ReactComponent as FreeShipping } from "../../assets/ProductFeatures/FreeShipping.svg";
import { ReactComponent as OnlineSupport } from "../../assets/ProductFeatures/OnlineSupport.svg";
import { ReactComponent as FlexiblePayment } from "../../assets/ProductFeatures/FlexiblePayment.svg";
import services from '../../api/api';
import CategorySlider from '../../components/Sliders/CategorySlider/CategorySlider.jsx';
import NewArrivalsSlider from '../../components/Sliders/NewArrivalsSlider/NewArrivalsSlider.jsx';
import AllCategories from "../../components/AllCategories/AllCategories";
import BarLoader from 'react-spinners/BarLoader';

const Products = () => {
  const [specificCategories, setSpecificCategories] = useState();
  const [recentProducts, setRecentProducts] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          services.productCategoryAPI.getSpecificProductCategories(setSpecificCategories),
          services.productAPI.getRecentProducts(setRecentProducts)
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
    <div className='productPage'>
      <section className='allCategoriesSection'>
        <div className='container'>
          <AllCategories />
        </div>
      </section>
      <section className='aboutProductsSection'>
        <div className="container">
          <div className="aboutProductsContent">
            <h2>Your One-Stop Camping Shop</h2>
            <h4>Diverse Selection from Multiple Sellers</h4>
            <h6>We bring together a variety of camping products from different sellers to offer you the best choices. From tents and backpacks to cooking gear, outdoor apparel, and rental equipment, find what suits your needs and preferences.</h6>
          </div>
          <div className='overlay'></div>
        </div>
      </section>
      <section className='popularCategoriesSection'>
        <div className="container">
          <h1>POPULAR CATEGORIES</h1>
          {specificCategories && <CategorySlider categories={specificCategories} />}
        </div>
      </section>
      <section className="popularSellersSection">
        <div className="container">
          <h1>POPULAR SELLERS</h1>
          <div className="popularSellersLogoContainer">
            <div className="popularSellersLogo">
              <Decathlon />
            </div>
            <div className="popularSellersLogo">
              <Columbia />
            </div>
            <div className="popularSellersLogo">
              <JackWolfskin />
            </div>
            <div className="popularSellersLogo">
              <Dometic />
            </div>
            <div className="popularSellersLogo">
              <Alpinist />
            </div>
            <div className="popularSellersLogo yonja">
              <Yonja />YONJA.AZ
            </div>
          </div>
        </div>
      </section>
      <section className='newArrivalsSection'>
        <div className="container">
          <div className="newArrivalsContainer">
            <h1>NEW ARRIVALS</h1>
            {
              recentProducts && <NewArrivalsSlider recentProducts={recentProducts} />
            }

          </div>
        </div>
      </section>
      <section className="shoppingFeaturesSection">
        <div className="container">
          <div className="shoppingFeaturesContainer">
            <div className="shoppingFeatures">
              <div className="featuresIcon"><FreeShipping /></div>
              <div className="featuresContent">
                <h4>Free Shipping</h4>
                <p>Free Shipping for orders over $100.</p>
              </div>
            </div>
            <div className="shoppingFeatures">
              <div className="featuresIcon"><MoneyGuarantee /></div>
              <div className="featuresContent">
                <h4>Money Guarantee</h4>
                <p>Within 14 days for an exchange.</p>
              </div>
            </div>
            <div className="shoppingFeatures">
              <div className="featuresIcon"><OnlineSupport /></div>
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

export default Products