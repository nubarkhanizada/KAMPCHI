import "./home.scss";
import React, { useEffect, useState } from 'react'
import HomeSlider from '../../components/Sliders/HomeSlider/HomeSlider.jsx';
import { CiInstagram } from "react-icons/ci";
import services from "../../api/api.js";
import NewArrivalsSlider from "../../components/Sliders/NewArrivalsSlider/NewArrivalsSlider.jsx";
import TourNewArrivalsSlider from "../../components/Sliders/TourNewArrivalsSlider/TourNewArrivalsSlider.jsx";
import BarLoader from 'react-spinners/BarLoader';

const Home = () => {
  const [recentProducts, setRecentProducts] = useState();
  const [recentTours, setRecentTours] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          services.productAPI.getRecentProducts(setRecentProducts),
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
    <div className="homePage">
      <HomeSlider />
      <section className="gearsAndToursSection">
        <div className="container">
          <div className="gearsAndTours">
            <div className="attention">
              <h1>Experience the Joy of Camping</h1>
              <p>Enjoy the essence of camping without the hassle. We provide everything you need to make your outdoor adventure flawless.</p>
            </div>
            <div className="imagesContainer">
              <img src="https://nautm.com/demo/mounter/wp-content/uploads/2024/04/travel-1.jpg" alt="" />
              <img src="https://nautm.com/demo/mounter/wp-content/uploads/2024/04/travel-2.jpg" alt="" />
            </div>
          </div>
          <div className="checkLest">
            <p>Diverse gear and tours for every adventure and camping style</p>
            <p>24/7 customer support to assist you at any time</p>
            <p>No fees on card transactions for a hassle-free purchase</p>
            <p>Flexible payment options to suit your needs</p>
            <p>Satisfaction Guaranteed with every product and tour</p>
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
      <section className="instagramSection">
        <div className="container">
          <div className="instagram">
            <h1 className="title">INSTAGRAM</h1>
            <div className="imageContainer">

              <div className="image">
                <img src="https://images.immediate.co.uk/production/volatile/sites/30/2022/06/Top-10-camping-foods-hero-image-657a688.jpg" alt="" />
                <div className="overlay">
                  <div className="overlayContent">
                    <a href="https://www.instagram.com/reel/C94QKX6u1Rp/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="><CiInstagram size={40} /></a>
                  </div>
                </div>
              </div>

              <div className="image">
                <img src="https://www.jack-wolfskin.com/on/demandware.static/-/Library-Sites-JackWolfskin_SharedContentLib/default/dw1b753b31/landingpages/20240229Activity/img/hiking/Distribution_1_M_L_XL.jpg" alt="" />
                <div className="overlay">
                  <div className="overlayContent">
                    <a href="https://www.instagram.com/reel/C01zaREsZQ5/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="><CiInstagram size={40} /></a>
                  </div>
                </div>
              </div>

              <div className="image" style={{ width: "40%" }} >
                <img src="https://images.wsj.net/im-815922/?width=3000&size=1.5" alt="" />
                <div className="overlay">
                  <div className="overlayContent">
                    <a href="https://www.instagram.com/p/CFhrIJKgCZK/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="><CiInstagram size={40} /></a>
                  </div>
                </div>
              </div>

              <div className="image">
                <img src="https://campe-theme.myshopify.com/cdn/shop/files/insta-06_ea0a92ac-d900-41bf-804b-47bdad538fa0.jpg?v=1646478770" alt="" />
                <div className="overlay">
                  <div className="overlayContent">
                    <a href="https://www.instagram.com/reel/C9c_iWkuIuy/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="><CiInstagram size={40} /></a>
                  </div>
                </div>
              </div>

              <div className="image">
                <img src="https://campe-theme.myshopify.com/cdn/shop/files/insta-04_00db8334-bec7-4d0a-b83d-970bb7140376.jpg?v=1646478822" alt="" />
                <div className="overlay">
                  <div className="overlayContent">
                    <a href="https://www.instagram.com/reel/C7MuIg3tcOW/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="><CiInstagram size={40} /></a>
                  </div>
                </div>
              </div>

              <div className="image" style={{ width: "40%" }} >
                <img src="https://img.sunset02.com/sites/default/files/styles/4_3_horizontal_inbody_900x506/public/image/2016/06/main/camp-gear-tent_0.jpg" alt="" />
                <div className="overlay">
                  <div className="overlayContent">
                    <a href="https://www.instagram.com/reel/C7tQrbpNUDk/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="><CiInstagram size={40} /></a>
                  </div>
                </div>
              </div>

              <div className="image">
                <img src="https://kamperen.qodeinteractive.com/wp-content/uploads/sb-instagram-feed-images/200628260_306397990932053_2706341983454237555_nfull.jpg" alt="" />
                <div className="overlay">
                  <div className="overlayContent">
                    <a href="https://www.instagram.com/p/Cgwsih9jACX/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="><CiInstagram size={40} /></a>
                  </div>
                </div>
              </div>

              <div className="image">
                <img src="https://contents.mediadecathlon.com/s1045801/k$f565435ab9f757520f7ff22b34494a77?format=auto&f=3000x0" alt="" />
                <div className="overlay">
                  <div className="overlayContent">
                    <a href="https://www.instagram.com/reel/C4LbuVtNCtf/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="><CiInstagram size={40} /></a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home