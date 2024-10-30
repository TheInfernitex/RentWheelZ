// src/components/LoginModal.js
import React, { useState } from 'react';
import axios from 'axios';
import InputField from './InputField';
import Button from './Button';
import '../styles/modal.css';
import { useAuth } from '../app/AuthContext';  // Import the context

const BookingModal = ({ onClose, userId, vehicleId, company, model }) => {

    const [result, setResult] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const { jwtToken } = useAuth(); 


  const handleSubmit = async (e) => {
        e.preventDefault();
        setResult('Booked');
        const booking = {
        customerId: userId, 
        vehicleId,
        startDate,
        endDate
        };
        try {
            const response = await axios.post('http://localhost:8081/api/bookings/create', booking, {
                params: {
                    token: jwtToken,
                },
            });
            console.log('Booking successful:', response.data);
            setResult('Booking successful!');
            setTimeout(() => {
                setResult('');
                onClose();
            }, 1000);
            } catch (err) {
            setResult('Booking failed. Please check your credentials.');
            setTimeout(() => {
                setResult('');
            }, 3000);
        };
    }

  return (

    <div className="modal booking-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h1>Book a {company} {model}</h1>
        <form onSubmit={handleSubmit}>
          <InputField
            type="date"
            placeholder="Enter the start date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
                    <InputField
            type="date"
            placeholder="Enter the end date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          {result && <p className="result-message">{result}</p>}
          <Button text="Book" />
        </form>
      </div>
    </div>
  );
};

export default BookingModal;

