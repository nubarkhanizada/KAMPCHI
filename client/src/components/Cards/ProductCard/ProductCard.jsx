import "./productcard.scss";
import { Link } from 'react-router-dom';
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { CiShoppingCart, CiEdit, CiTrash } from "react-icons/ci";
import { useContext, useState } from "react";
import { FavoritesContext } from "../../../contexts/FavoritesContext";
import services from "../../../api/api";
import ProductEditModal from "../../Modals/ProductEditModal/ProductEditModal";
import { CartContext } from "../../../contexts/CartContext";

const ProductCard = ({ productId, image, title, name, price, isStocked, productOwnerId }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userRoleId = user ? user.userRoleId : null;
    const userId = user ? user.userId : null;
    const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
    const { addToCart } = useContext(CartContext);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const isFavorite = favorites.some((item) => item.productId === productId);

    const cartHandler = () => {
        if (isStocked === 1) {
            addToCart({ productId, image, title, name, price, isStocked }, "product");
        }
    };

    const favoriteHandler = () => {
        if (isFavorite) {
            removeFromFavorites(productId);
        } else {
            addToFavorites({ productId, image, title, name, price, isStocked });
        }
    };

    const editHandler = () => {
        setEditModalOpen(true);
    };

    const deleteHandler = () => {
        services.productAPI.deleteProductById(productId);
    };

    return (
        <div className='productCard'>
            <Link className="productCardImg" to={`/product/details/${productId}`}>
                <img src={image} alt={title} />
            </Link>
            <div className="productCardContent">
                <p className='productCardCategory'>{name}</p>
                <p className='productCardTitle'>{title}</p>
            </div>
            <div className="productCardPriceCart">
                <p className='productCardPrice'>$ {price}</p>
                <div className="productCardCart" style={{ cursor: isStocked === 1 ? 'pointer' : 'not-allowed' }} onClick={cartHandler}>
                    <CiShoppingCart />
                    <p>{isStocked === 1 ? 'ADD TO CART' : 'OUT OF STOCK'}</p>
                </div>
            </div>
            <div className="productCardFavoriteIcon">
                {isFavorite
                    ? (<IoIosHeart className="heart" onClick={favoriteHandler} />)
                    : (<IoIosHeartEmpty className="emptyHeart" onClick={favoriteHandler} />)
                }
            </div>
            <div className={`productCardEditDeleteIcon ${userRoleId === 3 && userId === productOwnerId ? 'showForOwner' : ''}`}>
                <CiEdit className="edit" onClick={() => editHandler(productId)} />
                <CiTrash className="trash" onClick={() => deleteHandler(productId)} />
            </div>
            <ProductEditModal isOpen={isEditModalOpen} onRequestClose={() => setEditModalOpen(false)} productId={productId} />
        </div>
    );
}

export default ProductCard;
