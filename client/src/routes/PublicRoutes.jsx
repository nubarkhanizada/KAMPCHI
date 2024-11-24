import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import UserProvider from '../contexts/UserContext'
import FavoritesProvider from '../contexts/FavoritesContext'
import SavedProvider from '../contexts/SavedContext'
import CartProvider from '../contexts/CartContext'
import Layout from '../layout/Layout'
import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import Products from '../pages/Products/Products'
import ProductDetails from '../pages/Products/ProductsDetails/ProductDetails'
import ProductsCategory from '../pages/Products/ProductsCategory/ProductsCategory'
import Favorites from '../pages/Favorites/Favorites'
import Tours from '../pages/Tours/Tours'
import TourDetails from '../pages/Tours/TourDetails/TourDetails'
import ToursCategory from '../pages/Tours/ToursCategory/ToursCategory'
import Saved from '../pages/Saved/Saved'
import Cart from '../pages/Cart/Cart'
import Register from '../pages/Login/Register'
import Login from '../pages/Login/Login'
import Business from '../pages/Business/Business'
import SellerRegister from '../pages/Login/SellerRegister'
import GuideRegister from '../pages/Login/GuideRegister'
import SellerPage from '../pages/Business/SellerPage/SellerPage'
import GuidePage from '../pages/Business/GuidePage/GuidePage'
import NotFound from '../pages/NotFound/NotFound'

const PublicRoutes = () => {
    return (
        <div>
            <UserProvider>
                <FavoritesProvider>
                    <SavedProvider>
                        <CartProvider>
                            <Layout>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/products" element={<Products />} />
                                    <Route path="/product/details/:id" element={<ProductDetails />} />
                                    <Route path='/category/:id' element={<ProductsCategory />} />
                                    <Route path="/favorites" element={<Favorites />} />
                                    <Route path="/tours" element={<Tours />} />
                                    <Route path="/tour/details/:id" element={<TourDetails />} />
                                    <Route path='/tour/category/:id' element={<ToursCategory />} />
                                    <Route path="/saved" element={<Saved />} />
                                    <Route path="/cart" element={<Cart />} />
                                    <Route path="/auth/register" element={<Register />} />
                                    <Route path="/auth/login" element={<Login />} />
                                    <Route path="/business" element={<Business />} />
                                    <Route path="/business/seller/register" element={<SellerRegister />} />
                                    <Route path="/business/guide/register" element={<GuideRegister />} />
                                    <Route path="/business/seller" element={<ProtectedRoute element={SellerPage} />} />
                                    <Route path="/business/guide" element={<ProtectedRoute element={GuidePage} />} />
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </Layout>
                        </CartProvider>
                    </SavedProvider>
                </FavoritesProvider>
            </UserProvider>
        </div>
    )
}

export default PublicRoutes