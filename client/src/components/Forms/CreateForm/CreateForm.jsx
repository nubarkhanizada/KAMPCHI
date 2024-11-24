import "./createform.scss";
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import services from '../../../api/api';
import toast from "react-hot-toast";

const CreateForm = () => {
    const [setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    // watching
    const isRentedValue = watch('isRented', "");
    const imageURL = watch('image');
    const categoryID = watch('categoryID')

    useEffect(() => {
        services.productCategoryAPI.getProductCategories(setCategories);
    }, []);

    const onSubmit = async (data) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const userID = user ? user.userId : null;

        if (!userID) {
            toast.error("User ID is missing. Please log in again.");
            window.location.href = '/login';
            return;
        }

        const trimmedData = {
            ...data,
            title: data.title.trim(),
            shortDescription: data.shortDescription.trim(),
            longDescription: data.longDescription ? data.longDescription.trim() : null,
            price: parseFloat(data.price),
            productCode: data.productCode.trim(),
            categoryID: data.categoryID,
            image: data.image.trim(),
            isRented: data.isRented,
            rentalPrice: data.isRented === "1" ? parseFloat(data.rentalPrice) : null,
            userID: parseInt(userID, 10)
        };

        try {
            await services.productAPI.createProduct(trimmedData, setProduct);
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
            <div className="createNewProduct">ADD NEW PRODUCT</div>
            <div className="form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="formGroup">
                        <label htmlFor="title">*Product Title</label>
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
                        <label htmlFor="price">*Product Price</label>
                        <input
                            id="price"
                            className="formInput"
                            type="number"
                            {...register('price', { required: true })}
                        />
                        {errors.price && <p className="error" style={{ color: "red", fontSize: "12px", marginTop: "1%" }} >Price is required.</p>}
                    </div>

                    <div className="formGroup">
                        <label htmlFor="productCode">*Product Code</label>
                        <input
                            id="productCode"
                            className="formInput"
                            type="text"
                            {...register('productCode', { required: true, maxLength: 10 })}
                        />
                        {errors.productCode && <p className="error" style={{ color: "red", fontSize: "12px", marginTop: "1%" }} >Product code is required and must be less than 10 characters.</p>}
                    </div>

                    <div className="formGroup">
                        <label htmlFor="productCategory">*Product Category</label>
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
                        <label htmlFor="image">Image URL</label>
                        <input
                            id="image"
                            className="formInput"
                            type="url"
                            {...register('image', { required: true })}
                        />
                        {imageURL && (
                            <a href={imageURL} target="_blank" rel="noopener noreferrer">
                                <img className="image" src={imageURL} alt="Product Preview" style={{ width: "100%", minHeight: "275px", maxHeight: "384px", height: "275px", cursor: "pointer", marginTop: "6%" }} />
                            </a>
                        )}
                        {errors.image && <p className="error" style={{ color: "red", fontSize: "12px", marginTop: "1%" }} >Image URL is required.</p>}
                    </div>

                    <div className="formGroup">
                        <label htmlFor="isRented">*Is Available for Rent</label>
                        <select
                            id="isRented"
                            className="formInput"
                            value={isRentedValue}
                            {...register('isRented', { required: true })}
                        >
                            <option value="" disabled hidden></option>
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </select>
                        {errors.isRented && <p className="error" style={{ color: "red", fontSize: "12px", marginTop: "1%" }} >Please specify if the product is available for rent.</p>}
                    </div>

                    {isRentedValue === "1" && (
                        <div className="formGroup">
                            <label htmlFor="rentalPrice">*Rental Price</label>
                            <input
                                id="rentalPrice"
                                className="formInput"
                                type="number"
                                {...register('rentalPrice', { required: isRentedValue === "1" })}
                            />
                            {errors.rentalPrice && <p className="error" style={{ color: "red", fontSize: "12px", marginTop: "1%" }} >Rental price is required when the product is available for rent.</p>}
                        </div>
                    )}

                    <div className="formGroup">
                        <input className="formInput submitButton" type="submit" value="Add Product" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateForm;
