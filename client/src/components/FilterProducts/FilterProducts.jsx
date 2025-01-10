import React from 'react'
import "./filterproducts.scss";
import Select from 'react-select';
import services from '../../api/api';
import { useParams } from 'react-router-dom';

const FilterProducts = ({ setProducts }) => {
    const { id } = useParams();

    const sortOptions = [
        { value: '1', label: 'Title: A to Z' },
        { value: '2', label: 'Title: Z to A' },
        { value: '3', label: 'Price: Low to High' },
        { value: '4', label: 'Price: High to Low' },
        { value: '5', label: 'Date: Newest to Oldest' }
    ];

    const filterHandler = (selectedOption) => {
        services.productAPI.filterProducts(id, selectedOption.value, setProducts)
    }

    return (
        <div>
            <Select
                className="reactSelectContainer"
                classNamePrefix="reactSelect"
                isSearchable={false}
                options={sortOptions}
                placeholder="Sort by..."
                onChange={filterHandler}
            />
        </div>
    )
}

export default FilterProducts