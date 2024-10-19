// src/components/LoginModal.js
import React, { useState } from 'react';
import axios from 'axios';
import InputField from './InputField';
import Button from './Button';
import '../styles/modal.css';
import ForgotPassModal from "@/components/ForgotPassModal";

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const [isForgotpassOpen, setIsForgotpassOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult('');  

    try {
      const response = await axios.post('http://localhost:8081/api/users/login', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
      setResult('Login successful!');
    } catch (err) {
      setResult('Login failed. Please check your credentials.');
    } finally {
      setTimeout(() => {
        setResult('');
        onClose();
      }, 5000);
    }
  };

  return (

    <div className="modal">

      {isForgotpassOpen && <ForgotPassModal onClose={() => setIsForgotpassOpen(false)} />}
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Login</h2>
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
          {result && <p className="result-message">{result}</p>}
          <Button text="Login" />
        </form>
        <button className={"custom-button"} onClick={() => {
          console.log("forgot password clicked");
          setIsForgotpassOpen(true)
        }} >Forgot Password</button>
      </div>
    </div>
  );
};

export default LoginModal;

