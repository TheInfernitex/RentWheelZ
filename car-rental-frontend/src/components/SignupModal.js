// src/components/SignupModal.js
import React, { useState } from 'react';
import axios from 'axios';
import InputField from './InputField';
import Button from './Button';
import '../styles/modal.css';

const SignupModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // Clear any previous errors

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/api/users/signup', {
        email,
        password,
      });
      // Handle the response (e.g., redirect user, store token, etc.)
      console.log('Signup successful:', response.data);
      onClose(); // Close the modal after a successful signup
    } catch (err) {
      console.error('Error during signup:', err.message);
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Email: "
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="Password: "
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputField
            label="Confirm Password: "
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
          <Button text="Signup" />
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
