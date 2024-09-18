import "./allcategories.scss";
import React, { useEffect, useState } from 'react'
import services from '../../api/api';
import { NavLink, useParams } from "react-router-dom";

const AllCategories = () => {
    const { id } = useParams();
    const [categories, setCategories] = useState();

    useEffect(() => {
        services.productCategoryAPI.getProductCategories(setCategories);
    }, [id]);

    return (
        <div className="allCategoriesContainer">
            {categories && categories.map(item => {
                return (
                    <p key={item.id}>
                        <NavLink to={`/category/${item.id}`}>{item.name}</ NavLink>
                    </p>
                )
            })}
        </div>
    )
}

export default AllCategories