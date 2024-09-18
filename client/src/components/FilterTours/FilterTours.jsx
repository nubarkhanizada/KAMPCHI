import React from 'react'
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import services from '../../api/api';

const FilterTours = ({ setTours }) => {
    const { id } = useParams();

    const sortOptions = [
        { value: '1', label: 'Title: A to Z' },
        { value: '2', label: 'Title: Z to A' },
        { value: '3', label: 'Price: Low to High' },
        { value: '4', label: 'Price: High to Low' },
        { value: '5', label: 'Date: Soonest to Latest' },
        { value: '6', label: 'Date: Latest to Soonest' }
    ];

    const filterHandler = (selectedOption) => {
        services.tourAPI.filterTours(id, selectedOption.value, setTours)
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

export default FilterTours