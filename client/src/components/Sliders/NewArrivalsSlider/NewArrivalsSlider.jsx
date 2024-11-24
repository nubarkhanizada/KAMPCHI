import "./newarrivalsslider.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../../Cards/ProductCard/ProductCard";

const NewArrivalsSlider = ({ recentProducts }) => {

    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <Slider {...settings}>
            {
                recentProducts && recentProducts.map(item => {
                    return (
                        <ProductCard
                            key={item.productId}
                            productId={item.productId}
                            title={item.title}
                            name={item.name}
                            price={item.price}
                            image={item.image}
                            isStocked={item.isStocked}/>
                    )
                }
                )
            }
        </Slider>
    )
}

export default NewArrivalsSlider