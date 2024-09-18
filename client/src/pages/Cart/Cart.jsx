import { CartContext } from "../../contexts/CartContext";
import "./cart.scss";
import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { CiTrash } from "react-icons/ci";
import { HiOutlineArrowLongLeft, HiOutlineArrowLongRight } from "react-icons/hi2";

const Cart = () => {
    const { products, tours, removeFromCart, increaseQuantity, decreaseQuantity, totalAmount, totalItems, TotalQuantity } = useContext(CartContext);

    return (
        <div className="cartPage">
            <div className="container">
                <div className="cartContainer">
                    <div className="cartProductsAndTours" style={{ width: totalItems() > 0 ? "70%" : "100%" }} >
                        {
                            products && products.length > 0 &&
                            <div className="cartTableContainer productsTableContainer" style={{ marginBottom: "3%" }}>
                                {products && products.length > 0 && <h1>PRODUCTS ({products.length})</h1>}
                                <div className="tableContainer">
                                    {products && products.length > 0
                                        && products.map(item => {
                                            return (
                                                <div className="cartTableRow" key={item.productId}>
                                                    <div className="cartTableData"><Link to={`/product/details/${item.productId}`}><img style={{ width: "100px", height: "100px" }} src={item.image} alt={item.title} /></Link></div>
                                                    <div className="cartTableData cartTableDataTitle" style={{ width: "30%" }}><Link to={`/product/details/${item.productId}`}>{item.title}</Link></div>
                                                    <div className="cartTableData" style={{ width: "10%" }}>
                                                        <span className="cartQuantity">
                                                            <AiOutlineMinus className='decreaseQuantity' onClick={() => decreaseQuantity(item.productId, "product")} />
                                                            {item.quantity}
                                                            <AiOutlinePlus className='increaseQuantity' onClick={() => increaseQuantity(item.productId, "product")} />
                                                        </span>
                                                    </div>
                                                    <div className="cartTableData" style={{ width: "10%" }}>$ {item.price}</div>
                                                    <div className="cartTableData" style={{ width: "10%" }}>$ {(item.quantity * item.price).toFixed(2)}</div>
                                                    <div className="cartTableData cartTableActions" ><button className='cartDeleteButton'><CiTrash onClick={() => removeFromCart(item.productId, "product")} /></button></div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        }

                        {
                            tours && tours.length > 0 &&
                            <div className="cartTableContainer toursTableContainer" >
                                {tours && tours.length > 0 && <h1>TOURS ({tours.length})</h1>}
                                <div className="tableContainer">
                                    {tours.length > 0
                                        && tours.map(item => {
                                            return (
                                                <div className="cartTableRow" key={item.tourId}>
                                                    <div className="cartTableData"><Link to={`/tour/details/${item.tourId}`}><img style={{ width: "100px", height: "100px" }} src={item.tourImage} alt={item.title} /></Link></div>
                                                    <div className="cartTableData cartTableDataTitle" style={{ width: "30%" }}><Link to={`/tour/details/${item.tourId}`}>{item.title}</Link></div>
                                                    <div className="cartTableData" style={{ width: "10%" }}>
                                                        <span className="cartQuantity">
                                                            <AiOutlineMinus className='decreaseQuantity' onClick={() => decreaseQuantity(item.tourId, "tour")} />
                                                            {item.quantity}
                                                            <AiOutlinePlus className='increaseQuantity' onClick={() => increaseQuantity(item.tourId, "tour")} />
                                                        </span>
                                                    </div>
                                                    <div className="cartTableData" style={{ width: "10%" }}>$ {(item.price)}</div>
                                                    <div className="cartTableData" style={{ width: "10%" }}>$ {(item.quantity * item.price).toFixed(2)}</div>
                                                    <div className="cartTableData cartTableActions"><button className='cartDeleteButton'><CiTrash onClick={() => removeFromCart(item.tourId, "tour")} /></button></div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        }
                        {
                            products.length === 0 && tours.length === 0 && (
                                <div className='emptyCartPage'>
                                    <div className="emptyCartPageImage">
                                        <img src="https://cdn2.iconfinder.com/data/icons/notional-illustrations/1000/e-commerce___shopping_cart_shop_groceries_man_people_commerce-512.png" alt="empty cart" />
                                    </div>
                                    <p>YOUR CART IS AS EMPTY AS A CAMPSITE WITHOUT A CAMPFIRE :)</p>
                                    <div className="navigate" >
                                        <Link to={"/products"}><HiOutlineArrowLongLeft />EXPLORE CAMPING GEAR</Link>
                                        <Link to={"/tours"}>EXPLORE CAMPING TOURS<HiOutlineArrowLongRight /></Link>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    {
                        totalItems() > 0 &&
                        <div className='cartSubtotal'>
                            <h1>ORDER SUMMARY</h1>
                            <p style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "13%" }}>Total quantity:<span style={{ border: "1px solid #fff", padding: "1% 0%", width: "15%", textAlign: "center" }}>{TotalQuantity()}</span></p>
                            <p style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #fff", padding: "2% 1%", marginBottom: "13%" }}>Subtotal:<span>$ {totalAmount()}</span></p>
                            <button >CHECKOUT</button>
                        </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default Cart