import "./productdetailscard.scss";
import React, { useContext, useState } from 'react'
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../../../contexts/FavoritesContext";
import { CartContext } from "../../../contexts/CartContext";

const ProductDetailsCard = ({ item }) => {
    const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
    const { addToCart } = useContext(CartContext);
    const [copyMessage, setCopyMessage] = useState();

    const isFavorite = favorites.some(favItem => favItem.productId === item.productId);
    const favoriteHandler = () => {
        if (isFavorite) {
            removeFromFavorites(item.productId);
        } else {
            addToFavorites(item);
        }
    };

    const cartHandler = async () => {
        if (item.isStocked === 1) {
            addToCart(item, "product");
        }
    }

    const rentHandler = () => { };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopyMessage('Product code copied!');
                setTimeout(() => {
                    setCopyMessage();
                }, 2000);
            })
            .catch((error) => {
                console.error('Failed to copy text: ', error);
            });
    };

    return (
        <div className="container">
            <div className='productDetailsCard'>
                <div className="productDetailsCardImg">
                    <img src={item.image} alt={item.title} />
                </div>
                <div className="productDetailsContentAndAbout">
                    <div className="productDetailsContent">
                        <p className='productDetailsTitle'>{item.title}</p>
                        <p className='productDetailsPrice'>$ {item.price}</p>
                        <p className='productDetailsShortDescription'>{item.shortDescription}</p>
                        <div className="productDetailsStockAndRent">
                            <p className={item.isStocked === 1 ? 'stockSuccess' : 'stockError'} >{item.isStocked === 1 ? 'IN STOCK' : 'OUT OF STOCK'}</p>
                            <p className={item.isRented === 1 ? 'rentSuccess' : ''}>{item.isRented === 1 ? 'AVAILABLE FOR RENT' : ''}</p>
                        </div>
                        <div className="productDetailsFavoriteAndCart">
                            <p className='productDetailsFavorite' onClick={favoriteHandler}>
                                {isFavorite ? <IoIosHeart className="heart" /> : <IoIosHeartEmpty className="emptyHeart" />}
                            </p>
                            <p className='productDetailsCart' onClick={item.isStocked === 1 ? cartHandler : null} style={{ cursor: item.isStocked === 1 ? 'pointer' : 'not-allowed' }}>{item.isStocked === 1 ? 'ADD TO CART' : 'OUT OF STOCK'}</p>
                            <p className='productDetailsRent' onClick={item.isRented === 1 ? rentHandler : null} style={{ display: item.isRented === 1 ? 'block' : 'none' }}>{`RENT NOW FOR $${item.rentalPrice}`}</p>
                        </div>
                    </div>
                    <div className="productDetailsAbout">
                        <p className='productDetailsCode'>
                            Product code:
                            <span
                                onClick={() => copyToClipboard(item.productCode)}>{item.productCode}
                                {copyMessage && <p>{copyMessage}</p>}
                            </span>
                        </p>

                        <p className='productDetailsCategory'>Category: <Link className="category" to={`/category/${item.categoryId}`}>{item.name}</Link></p>
                        <p className='productDetailsSeller'>Seller: {item.fullname}</p>
                        <details open className="descriptionDetails">
                            <summary>DESCRIPTION</summary>
                            <p className='productDetailsLongDescription'>{item.longDescription}</p>
                        </details>
                        <details className="informationDetails">
                            <summary>ADDITIONAL INFORMATION</summary>
                            <p className='productDetailsAdditionalInfo'><span>Shipping Information: </span>Free shipping on orders over $100.</p>
                            <p className='productDetailsAdditionalInfo'><span>Return Policy: </span>Returns accepted within 14 days of purchase. Items must be in original condition, unworn with tags attached, and for footwear, with the original box in new condition.</p>
                            <p className='productDetailsAdditionalInfo'><span>Rental Policy: </span>After payment, refunds are not available except in extraordinary situations. Rented favorites must be returned in undamaged condition. Any damage to the product may result in additional charges.</p>
                            <p className='productDetailsAdditionalInfo'><span>Still Have Questions: </span>Our customer support team is here to assist you hassle-free.</p>
                        </details>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default ProductDetailsCard
