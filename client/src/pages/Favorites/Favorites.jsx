import "./favorites.scss";
import ProductCard from "../../components/Cards/ProductCard/ProductCard";
import { FavoritesContext } from "../../contexts/FavoritesContext";
import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";

const Favorites = () => {
    const { favorites } = useContext(FavoritesContext)

    return (
        <div className="favoritesPage">
            <div className="container">
                <div className="favoritesContainer">
                    {favorites && favorites.length > 0 && <h1>FAVORITES ({favorites.length})</h1>}
                    <div className="favoritesCardContainer">
                        {favorites.length > 0
                            ? favorites.map(item => {
                                return (
                                    <ProductCard
                                        key={item.productId}
                                        productId={item.productId}
                                        title={item.title}
                                        name={item.name}
                                        price={item.price}
                                        image={item.image}
                                        isStocked={item.isStocked} />
                                )
                            })
                            :
                            <div className='emptyFavoritesPage'>
                                <div className="emptyFavoritesPageImage">
                                    <img src="https://cdn2.iconfinder.com/data/icons/notional-illustrations/1000/relationships___heart_favorite_love_romance_romantic_present_gift_box_package_man_people-512.png" alt="empty favorites" />
                                </div>
                                <p>YOUR FAVORITES LIST IS AS EMPTY AS A FRIDAY NIGHT WITHOUT PLANS :)</p>
                                <Link to={"/products"}><HiOutlineArrowLongLeft />EXPLORE CAMPING GEAR</Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Favorites