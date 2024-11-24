import './sellerpage.scss';
import React, { useEffect, useState } from 'react';
import CreateForm from '../../../components/Forms/CreateForm/CreateForm';
import services from '../../../api/api';
import ProductCard from '../../../components/Cards/ProductCard/ProductCard';
import BarLoader from 'react-spinners/BarLoader';

const SellerPage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userID = user ? user.userId : null;
    const [products, setProducts] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        try {
          await Promise.all([
            services.productAPI.getProductsByUserId(userID, setProducts)
          ]);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [products, userID]);
  
    if (loading) {
      return (
        <div className="loaderContainer">
          <BarLoader color="#212121" width="40%" height={6}/>
        </div>
      );
    }

    return (
        <div className="container">
            <div className="sellerPage">
                <div className="creatingSection">
                    <CreateForm />
                </div>
                <div className="productsSection">
                    {products && products.length > 0 && <div className="yourProducts">YOUR PRODUCTS ({products.length})</div>}
                    {products === undefined ? (
                        <div>Loading...</div>
                    ) : products.length > 0 ? (
                        <div className="productsContainer">
                            {products.map(item => (
                                <ProductCard
                                    key={item.productId}
                                    productId={item.productId}
                                    title={item.title}
                                    name={item.name}
                                    price={item.price}
                                    image={item.image}
                                    isStocked={item.isStocked}
                                    productOwnerId={item.userId}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="productsSectionImage">
                            <img src="https://cdn2.iconfinder.com/data/icons/notional-illustrations/1000/finance___financial_man_people_person_coin_investment_savings_increase_arrow-512.png" alt="No products" />
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default SellerPage;
