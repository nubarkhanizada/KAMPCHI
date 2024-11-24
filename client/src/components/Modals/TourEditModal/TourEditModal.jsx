import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import services from '../../../api/api';
Modal.setAppElement('#root');

const TourEditModal = ({ isOpen, onRequestClose, tourId }) => {
    const { register, handleSubmit, reset } = useForm();
    const [tour, setTour] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        services.tourCategoryAPI.getTourCategories(setCategories);
    }, []);

    useEffect(() => {
        if (isOpen) {
            services.tourAPI.getTourById(tourId, (data) => {
                if (data && data.length > 0) {
                    setTour(data[0]);

                } else {
                    setTour(null);
                }
            }).catch(error => console.error(error));
        }
    }, [isOpen, tourId, reset]);

    const onSubmit = (data) => {
        console.log("Form Data:", data);
        const updatedData = {
            ...data,
            endDate: data.endDate || null,
            endTime: data.endTime || null,
        };

        services.tourAPI.updateTour(tourId, updatedData)
            .then(() => {
                onRequestClose();
            })
            .catch(error => console.error('Error updating tour:', error));
    };


    if (!tour) return null;

    const addDaysToDate = (dateString, days) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        date.setDate(date.getDate() + days);
        return date.toISOString().split('T')[0]; // YYYY-MM-DD format
    };

    return (
        <Modal className="modalContent" overlayClassName="modalOverlay" isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Edit Product">
            <div className="modalHeader">
                <h2>EDIT TOUR</h2>
                <button className="closeButton" onClick={onRequestClose}>X</button>
            </div>
            <form className="modalForm" onSubmit={handleSubmit(onSubmit)}>

                <div className="formGroup">
                    <label>*Tour Title</label>
                    <input {...register('title')} defaultValue={tour.title} />
                </div>

                <div className="formGroup">
                    <label>*Short Description</label>
                    <input {...register('shortDescription')} defaultValue={tour.shortDescription} />
                </div>

                <div className="formGroup">
                    <label>Long Description</label>
                    <textarea {...register('longDescription')} defaultValue={tour.longDescription}></textarea>
                </div>

                <div className="formGroup">
                    <label>*Tour Price</label>
                    <input type="number" step="0.01" {...register('price')} defaultValue={tour.price} />
                </div>

                <div className="formGroup">
                    <label>*Country</label>
                    <input {...register('country')} defaultValue={tour.country} />
                </div>

                <div className="formGroup">
                    <label>*City</label>
                    <input {...register('city')} defaultValue={tour.city} />
                </div>

                <div className="formGroup">
                    <label>*Start Date</label>
                    <input
                        type="date"
                        {...register('startDate')}
                        defaultValue={tour.startDate && addDaysToDate(tour.startDate, 1)}
                    />
                </div>

                <div className="formGroup">
                    <label>*End Date</label>
                    <input
                        type="date"
                        {...register('endDate')}
                        defaultValue={tour.endDate ? addDaysToDate(tour.endDate, 1) : ''}
                    />
                </div>

                <div className="formGroup">
                    <label>*Start Time</label>
                    <input type="time" {...register('startTime')} defaultValue={tour.startTime} />
                </div>

                <div className="formGroup">
                    <label>*End Time</label>
                    <input
                        type="time"
                        {...register('endTime')}
                        defaultValue={tour.endTime || ''}
                    />
                </div>

                <div className="formGroup">
                    <label>*Tour Category</label>
                    <select
                        defaultValue={tour.categoryId}
                        {...register('categoryID', { required: true })}
                    >
                        {categories.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>

                <div className="formGroup">
                    <label>*Image URL</label>
                    <input {...register('image')} defaultValue={tour.tourImage} />
                </div>

                <div className="formGroup">
                    <label>Is Available</label>
                    <select {...register('isStocked')} defaultValue={tour.isStocked}>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>

                <button className="submitButton" type="submit">Save</button>
            </form>
        </Modal>
    )
}

export default TourEditModal