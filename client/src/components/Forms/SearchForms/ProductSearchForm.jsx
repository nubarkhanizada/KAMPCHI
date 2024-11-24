import React, { useState } from 'react'
import "./productsearchform.scss";
import { CiSearch } from 'react-icons/ci'
import { Link } from "react-router-dom";
import services from '../../../api/api';

const SearchForm = () => {
    const [products, setProducts] = useState()
    const [searchPerformed, setSearchPerformed] = useState(false);

    const searchHandler = (e) => {
        if (e.target.value.trim() !== "") {
            services.productAPI.searchProducts(e.target.value, setProducts)
            setSearchPerformed(true);
        }
        else {
            setProducts(null)
            setSearchPerformed(false);
        }
    }
    return (
        <div className="productCategorySearch">
            <input onChange={searchHandler} type="text" placeholder="Search all products..." />
            <button type="button" ><CiSearch /></button>
            {searchPerformed && (products && products.length > 0 ? (
                <div className="productCategorySearchItems">
                    {products.map(item => (
                        <div className='searchResults' key={item.productId}>
                            <Link className='searchResultsItem' onClick={() => setProducts(null)} to={`/product/details/${item.productId}`}>
                                <div className="searchResultImage">
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <div className="searchImageContent">
                                    <p>{item.title}</p>
                                    <p>$ {item.price}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="productCategorySearchItems emptySearchItems">
                    <div className="searchResults">
                        <div className='searchResultsItem'>
                            No results found for your query. Please try again.
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default SearchForm