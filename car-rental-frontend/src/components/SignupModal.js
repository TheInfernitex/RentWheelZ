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
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult('');

    if (password !== confirmPassword) {
      setResult('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/api/users/signup', {
        email,
        password,
      });
      setResult('Signup successful!');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error('Error during signup:', err.message);
      setResult('Signup failed. Please try again.');
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
          {result && <p className="result-message">{result}</p>}
          <Button text="Signup" />
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
