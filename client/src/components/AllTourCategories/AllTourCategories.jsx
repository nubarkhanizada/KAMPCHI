import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import services from '../../api/api';

const AllTourCategories = () => {
    const { id } = useParams();
    const [tourCategories, setTourCategories] = useState();

    useEffect(() => {
        services.tourCategoryAPI.getTourCategories(setTourCategories);
    }, [id]);

    return (
        <div className="allCategoriesContainer">
            {tourCategories && tourCategories.map(item => {
                return (
                    <p key={item.id}>
                        <NavLink to={`/tour/category/${item.id}`}>{item.name}</ NavLink>
                    </p>
                )
            })}
        </div>
    )
}

export default AllTourCategories