import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import services from '../../../api/api';
import toast from 'react-hot-toast';

const TourCreateForm = () => {
    const [setTour] = useState(null);
    const [categories, setCategories] = useState([]);
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    // watching
    const imageURL = watch('image');
    const categoryID = watch('categoryID')

    useEffect(() => {
        services.tourCategoryAPI.getTourCategories(setCategories);
    }, []);

    const MAX_IMAGE_URL_LENGTH = 2048;
    const onSubmit = async (data) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const userID = user ? user.userId : null;

        if (!userID) {
            console.error("User ID is missing. Please log in again.");
            window.location.href = '/login';
            return;
        }

        if (data.image.length > MAX_IMAGE_URL_LENGTH) {
            alert(`Image URL is too long. Max length is ${MAX_IMAGE_URL_LENGTH} characters.`);
            return;
        }

        const trimmedData = {
            ...data,
            title: data.title.trim(),
            shortDescription: data.shortDescription.trim(),
            longDescription: data.longDescription ? data.longDescription.trim() : null,
            price: parseFloat(data.price),
            startDate: data.startDate.trim(),
            endDate: data.endDate.trim(),
            startTime: data.startTime.trim(),
            endTime: data.endTime.trim(),
            country: data.country,
            city: data.city,
            image: data.image,
            categoryID: data.categoryID,
            userID: parseInt(userID, 10)
        };

        try {
            await services.tourAPI.createTour(trimmedData, setTour);
        } catch (error) {
            if (error.response && error.response.data) {
                console.error("Server responded with:", error.response.data);
                toast.error(`Error: ${error.response.data.message}`);
            } else {
                toast.error("Failed to create product. Please try again.");
            }
        }
    };

    return (
        <div className="createForm">
            <div className="createNewProduct">ADD NEW TOUR</div>
            <div className="form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="formGroup">
                        <label htmlFor="title">*Tour Title</label>
                        <input
                            id="title"
                            className="formInput"
                            type="text"
                            {...register('title', { required: true, minLength: 5 })}
                        />
                        {errors.title && <p className="error" style={{ color: "red", fontSize: "12px", marginTop: "1%" }} >Title is required and must be at least 5 characters long.</p>}
                    </div>

                    <div className="formGroup">
                        <label htmlFor="shortDescription">*Short Description</label>
                        <textarea
                            id="shortDescription"
                            className="formInput"
                            {...register('shortDescription', { required: true, maxLength: 250 })}
                        />
                        {errors.shortDescription && <p className="error" style={{ color: "red", fontSize: "12px", marginTop: "1%" }} >Short description is required and must be less than 250 characters.</p>}
                    </div>

                    <div className="formGroup">
                        <label htmlFor="longDescription">Long Description</label>
                        <textarea
                            id="longDescription"
                            className="formInput"
                            {...register('longDescription')}
                        />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="price">*Tour Price</label>
                        <input
                            id="price"
                            className="formInput"
                            type="number"
                            {...register('price', { required: true })}
                        />
                        {errors.price && <p className="error" style={{ color: "red", fontSize: "12px", marginTop: "1%" }} >Price is required.</p>}
                    </div>

                    <div className="formGroup">
                        <label htmlFor="country">*Country</label>
                        <input
                            id="country"
                            className="formInput"
                            type="text"
                            {...register('country', { required: true })}
                        />
                        {errors.country && <p className="error" style={{ color: "red", fontSize: "12px", marginTop: "1%" }} >Country is required.</p>}
                    </div>

                    <div className="formGroup">
                        <label htmlFor="city">*City</label>
                        <input
                            id="city"
                            className="formInput"
                            type="text"
                            {...register('city', { required: true })}
                        />
                        {errors.city && <p className="error" style={{ color: "red", fontSize: "12px", marginTop: "1%" }} >City is required.</p>}
                    </div>

                    <div className="formGroup">
                        <label htmlFor="startDate">*Start Date</label>
                        <input
                            id="startDate"
                            className="formInput"
                            type="date"
                            {...register('startDate', { required: true })}
                        />
                        {errors.startDate && <p className="error" style={{ color: "red", fontSize: "12px", marginTop: "1%" }} >Start date is required.</p>}
                    </div>

                    <div className="formGroup">
                        <label htmlFor="endDate">End Date</label>
                        <input
                            id="endDate"
                            className="formInput"
                            type="date"
                            {...register('endDate')}
                        />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="startTime">*Start Time</label>
                        <input
                            id="startTime"
                            className="formInput"
                            type="time"
                            {...register('startTime', { required: true })}
                        />
                        {errors.startDate && <p className="error" style={{ color: "red", fontSize: "12px", marginTop: "1%" }} >Start time is required.</p>}
                    </div>

                    <div className="formGroup">
                        <label htmlFor="endTime">End Time</label>
                        <input
                            id="endTime"
                            className="formInput"
                            type="time"
                            {...register('endTime')}
                        />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="productCategory">*Tour Category</label>
                        <select
                            id="productCategory"
                            className="formInput"
                            value={categoryID}
                            {...register('categoryID', { required: true })}
                        >
                            <option value="" disabled hidden></option>
                            {categories.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                        {errors.categoryID && <p className="error" style={{ color: "red", fontSize: "12px", marginTop: "1%" }} >Category is required.</p>}
                    </div>

                    <div className="formGroup">
                        <label htmlFor="image">*Image URL</label>
                        <input
                            id="image"
                            className="formInput"
                            type="url"
                            {...register('image', { required: true })}
                        />
                        {imageURL && (
                            <a href={imageURL} target="_blank" rel="noopener noreferrer">
                                <img className='image' src={imageURL} alt="Product Preview" style={{ width: "100%", minHeight: "275px", maxHeight: "384px", height: "275px", cursor: "pointer", marginTop: "6%" }} />
                            </a>
                        )}
                        {errors.image && <p className="error" style={{ color: "red", fontSize: "12px", marginTop: "1%" }} >Image URL is required.</p>}
                    </div>

                    <div className="formGroup">
                        <input className="formInput submitButton" type="submit" value="Add Tour" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TourCreateForm