import "././productscategory.scss";
import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import services from '../../../api/api';
import FilterProducts from "../../../components/FilterProducts/FilterProducts";
import ProductCard from "../../../components/Cards/ProductCard/ProductCard";
import SearchForm from "../../../components/Forms/SearchForms/ProductSearchForm";
import AllCategories from "../../../components/AllCategories/AllCategories";
import BarLoader from 'react-spinners/BarLoader';

const ProductsCategory = () => {
    const { id } = useParams();
    const [categories, setCategories] = useState();
    const [products, setProducts] = useState();
    const [visibleProducts, setVisibleProducts] = useState(10);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    services.productCategoryAPI.getProductCategories(setCategories),
                    services.productAPI.getProductsByCategoryId(id, setProducts)
                ]);
            } finally {
                setLoading(false);
            }
        };
        
        setVisibleProducts(10);
        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="loaderContainer">
                <BarLoader color="#212121" width="40%" height={6} />
            </div>
        );
    }

    const loadMore = () => {
        setVisibleProducts(prev => prev + 10);
    };

    return (
        <div className='productCategoryPage'>
            <section className='allCategoriesSection'>
                <div className='container'>
                    <AllCategories />
                </div>
            </section>
            <section className="aboutProductCategorySection">
                <div className="container">
                    <div className="aboutProductCategoryContent">
                        <Link to={'/products'}>Products ﹥</Link><span>{categories && categories.find(selectedCategory => String(selectedCategory.id) === id)?.name}</span>
                        <h1>{categories && categories.find(selectedCategory => String(selectedCategory.id) === id)?.name}</h1>
                    </div>
                </div>
                <div className="overlay"></div>
            </section>
            <section className="searchAndFilterSection">
                <div className="container">
                    <div className="searchAndFilterContainer">
                        {products && products.length > 1 &&
                            <h1>{`Showing ${products.length} results`}</h1>
                        }
                        {products && products.length === 1 &&
                            <h1>{`Showing ${products.length} result`}</h1>
                        }
                        {products && products.length === 0 &&
                            <h1>Category is empty</h1>
                        }
                        <SearchForm />
                        <div className="productCategoryFilter">
                            <FilterProducts setProducts={setProducts} />
                        </div>
                    </div>
                </div>
            </section>
            <section className='filteredProductsSection'>
                <div className="container">
                    <div className="filteredProductsContainer">
                        <div className="filteredProductsCardContainer">
                            {products
                                && products.slice(0, visibleProducts).map((item) => {
                                    return <ProductCard
                                        key={item.productId}
                                        productId={item.productId}
                                        title={item.title}
                                        name={item.name}
                                        price={item.price}
                                        image={item.image}
                                        isStocked={item.isStocked}
                                        productOwnerId={item.userId} />;
                                })
                            }
                        </div>
                        {products && visibleProducts < products.length && (
                            <div className="loadMore" onClick={loadMore}>
                                <span>LOAD MORE</span>
                            </div>
                        )}
                    </div>
                </div>
            </section >
        </div >
    )
}

export default ProductsCategory