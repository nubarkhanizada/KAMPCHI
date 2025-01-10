import "./producteditmodal.scss";
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import services from '../../../api/api';
Modal.setAppElement('#root');

const ProductEditModal = ({ isOpen, onRequestClose, productId }) => {
    const { register, handleSubmit, watch, reset } = useForm();
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    // watching
    const isRentedValue = watch('isRented', "");

    useEffect(() => {
        services.productCategoryAPI.getProductCategories(setCategories);
    }, []);

    useEffect(() => {
        if (isOpen) {
            services.productAPI.getProductById(productId, (data) => {
                if (data && data.length > 0) {
                    setProduct(data[0]);

                } else {
                    setProduct(null);
                }
            }).catch(error => console.error(error));
        }
    }, [isOpen, productId, reset]);

    const onSubmit = (data) => {
        const updatedData = {
            ...data,
            rentalPrice: data.isRented === "1" ? parseFloat(data.rentalPrice) : 0.00
        };
        services.productAPI.updateProduct(productId, updatedData).then(() => {
            onRequestClose();
        }).catch(error => console.error(error));
    };

    if (!product) return null;

    return (
        <Modal className="modalContent" overlayClassName="modalOverlay" isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Edit Product">
            <div className="modalHeader">
                <h2>EDIT PRODUCT</h2>
                <button className="closeButton" onClick={onRequestClose}>X</button>
            </div>
            <form className="modalForm" onSubmit={handleSubmit(onSubmit)}>
                
                <div className="formGroup">
                    <label>*Product Title</label>
                    <input {...register('title')} defaultValue={product.title} />
                </div>

                <div className="formGroup">
                    <label>*Short Description</label>
                    <input {...register('shortDescription')} defaultValue={product.shortDescription} />
                </div>

                <div className="formGroup">
                    <label>Long Description</label>
                    <textarea {...register('longDescription')} defaultValue={product.longDescription}></textarea>
                </div>

                <div className="formGroup">
                    <label>*Product Price</label>
                    <input type="number" step="0.01" {...register('price')} defaultValue={product.price} />
                </div>

                <div className="formGroup">
                    <label>*Product Code</label>
                    <input {...register('productCode')} defaultValue={product.productCode} />
                </div>

                <div className="formGroup">
                    <label>*Image URL</label>
                    <input {...register('image')} defaultValue={product.image} />
                </div>

                <div className="formGroup">
                    <label>Is Available for Rent</label>
                    <select {...register('isRented')} defaultValue={product.isRented}>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>

                {isRentedValue === "1" && (
                    <div className="formGroup">
                        <label htmlFor="rentalPrice">*Rental Price</label>
                        <input
                            type="number" step="0.01"
                            {...register('rentalPrice', { required: isRentedValue === "1" })}
                            defaultValue={product.rentalPrice || 0.00}
                        />
                    </div>
                )}

                <div className="formGroup">
                    <label>*Product Category</label>
                    <select
                        defaultValue={product.categoryId}
                        {...register('categoryID', { required: true })}
                    >
                        {categories.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>

                <div className="formGroup">
                    <label>Is Available</label>
                    <select {...register('isStocked')} defaultValue={product.isStocked}>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>
                <button className="submitButton" type="submit">Save</button>
            </form>
        </Modal>
    );
}

export default ProductEditModal;
