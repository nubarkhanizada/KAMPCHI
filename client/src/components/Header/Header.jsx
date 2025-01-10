import React, { useContext, useEffect, useRef, useState } from "react";
import "./header.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/Logo.svg";
import { CiUser, CiHeart, CiShoppingCart } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import services from "../../api/api";
import { FavoritesContext } from "../../contexts/FavoritesContext";
import { UserContext } from "../../contexts/UserContext";
import { SavedContext } from "../../contexts/SavedContext";
import { CartContext } from "../../contexts/CartContext";

const Header = () => {
    const navigate = useNavigate()
    const { user, logout } = useContext(UserContext);
    const { saved } = useContext(SavedContext);
    const { favorites } = useContext(FavoritesContext);
    const { totalItems } = useContext(CartContext);
    const [userDropdownIsOpen, setUserDropdownIsOpen] = useState(false);
    const [categories, setCategories] = useState();
    const [tourCategories, setTourCategories] = useState();
    const [name, setName] = useState()
    const userDropdownRef = useRef(null);

    useEffect(() => {
        services.productCategoryAPI.getProductCategories(setCategories);
        services.tourCategoryAPI.getTourCategories(setTourCategories);
    }, []);

    useEffect(() => {
        if (user) {
            setName(user.fullname);
        } else {
            setName(null);
        }
    }, [user]);

    const handleLogout = async () => {
        logout();
        navigate("/");
        window.location.reload();
      };

    // closing dropdowns
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
                setUserDropdownIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectUser = () => {
        setUserDropdownIsOpen(false);
    };

    // columns for product categories
    const columns = categories ? Array.from({ length: Math.ceil(categories.length / 5) }, (_, index) =>
        categories.slice(index * 5, index * 5 + 5)
    ) : [];

    // columns for tour categories
     const tourColumns = tourCategories ? Array.from({ length: Math.ceil(tourCategories.length / 5) }, (_, index) =>
        tourCategories.slice(index * 5, index * 5 + 5)
     ) : [];

    const getButtonText = (userRoleId) => {
        switch (userRoleId) {
            case 1:
                return "Sell on KAMPCHI";
            case 2:
                return "Sell Now";
            case 3:
                return "Sell Now";
            default:
                return "Sell on KAMPCHI";
        }
    };

    const getLinkTo = (userRoleId) => {
        switch (userRoleId) {
            case 1:
                return "/business";
            case 2:
                return "/business/guide";
            case 3:
                return "/business/seller";
            default:
                return "/business";
        }
    };

    return (
        <header>
            <div className="container">
                <div className="headerAll">
                    <div className="headerLeft">
                        <Link className="logo" to={'/'}><Logo /></Link>
                    </div>
                    <nav>
                        <div className="navItem">
                            <NavLink className="linkNav" to="/">Home</NavLink>
                        </div>
                        <div className="navItem navDropdown">
                            <NavLink className="linkNav" to="/products">Products <IoIosArrowDown /></NavLink>
                            <div className="navDropdownMenu navDropdownMenuProducts">
                                <div className="navDropdownColumns">
                                    {columns.map((column, index) => (
                                        <div className="navDropdownColumn" key={index}>
                                            {column.map((item) => (
                                                <Link to={`/category/${item.id}`} key={item.id}>{item.name}</Link>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                                <div className="navDropdownImage">
                                    <img src="https://www.jack-wolfskin.com/on/demandware.static/-/Library-Sites-JackWolfskin_SharedContentLib/default/dwa56d2707/landingpages/20240229Equipment/img/hover_01_XL-S.jpg" alt="" />
                                    <Link className="shopNow" to="/products">SHOP NOW</Link>
                                </div>
                            </div>
                        </div>
                        <div className="navItem navDropdown">
                            <NavLink className="linkNav" to="/tours">Tours <IoIosArrowDown /></NavLink>
                            <div className="navDropdownMenu navDropdownMenuTours">
                                <div className="navDropdownColumns">
                                    {tourColumns.map((column, index) => (
                                        <div className="navDropdownColumn" key={index}>
                                            {column.map((item) => (
                                                <Link to={`/tour/category/${item.id}`} key={item.id}>{item.name}</Link>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                                <div className="navDropdownImage">
                                    <img src="https://www.myswissalps.com/wp-content/uploads/bachalpsee-tent-scaled.jpg" alt="" />
                                    <Link className="shopNow" to="/tours">EXPLORE NOW</Link>
                                </div>
                            </div>
                        </div>
                        <div className="navItem navDropdown">
                            <NavLink className="linkNav" to="/about">Pages <IoIosArrowDown /></NavLink>
                            <div className="navDropdownMenu navDropdownMenuPages">
                                <Link to="/about#about">About Us</Link>
                                <Link to="/about#contact">Contact Us</Link>
                                <Link to="/about#careers">Careers</Link>
                                <Link to="/blogs">Blogs</Link>
                            </div>
                        </div>
                    </nav>
                    <div className="headerRight">
                        <Link className='linkNav linkSignup' to={user && user ? getLinkTo(user.userRoleId) : "/business"}>{user && user ? getButtonText(user.userRoleId) : "Sell on KAMPCHI"}</Link>
                        <Link className="linkNav linkUser" onClick={() => { setUserDropdownIsOpen(!userDropdownIsOpen) }}><CiUser /></Link>
                        {userDropdownIsOpen &&
                            <div className="linknav userDropdown" ref={userDropdownRef}>
                                {
                                    user ?
                                        <div className='userDropdownMenu'>
                                            <p className='userName' onClick={selectUser}>{name}</p>
                                            <p className='logOut' onClick={handleLogout}>Log out</p>
                                        </div>
                                        :
                                        <div className='userDropdownMenu'>
                                            <p className='logIn'><Link to="/auth/login" onClick={selectUser}>Login</Link></p>
                                            <p className='register'><Link to="/auth/register" onClick={selectUser}>Register</Link></p>
                                        </div>
                                }
                            </div>
                        }
                        <Link className='linkNav linkFav' to="/favorites"><CiHeart /><p className='favLength'>{favorites.length}</p></Link>
                        <Link className='linkNav linkSave' to="/saved"><svg fill="currentColor" height="25" role="img" viewBox="0 0 24 24" width="24"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"></polygon></svg><p className='saveLength'>{saved.length}</p></Link>
                        <Link className='linkNav linkCart' to="/cart"><CiShoppingCart /><p className='cartLength'>{totalItems()}</p></Link>
                    </div>
                </div>
            </div>
        </header >
    )
}

export default Header