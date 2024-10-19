// src/components/ResetPassword.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputField from './InputField';
import Button from './Button';
import '../styles/modal.css';

const ResetPassword = ({ onClose, closeForgot }) => {
    const [resetToken, setResetToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [result, setResult] = useState('');
    const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds

    useEffect(() => {
        // Timer interval to count down every second
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer); // Clear interval when time is up
                    onClose(); // Close modal after time runs out
                    return 0;
                }
                return prevTime - 1; // Decrease time by 1 second
            });
        }, 1000);

        return () => clearInterval(timer); // Cleanup interval on component unmount
    }, [onClose]);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setResult('');

        try {
            const response = await axios.post('http://localhost:8081/api/users/resetpass', {
                resetToken,
                newPassword,
            });
            setResult('Password has been reset successfully!');
            setTimeout(() => {
                closeForgot(); // Close the Forgot Password modal
                onClose(); // Optionally close the modal after a successful reset
            }, 2000);
        } catch (err) {
            setResult('Failed to reset password. Invalid or expired token.');
        }
    };

    // Format time left into minutes and seconds
    const formatTimeLeft = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`; // Format to MM:SS
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button> {/* Close Button */}
                <h2>Reset Password</h2>
                <p>Time left: {formatTimeLeft(timeLeft)}</p>
                <form onSubmit={handleResetPassword}>
                    <InputField
                        label="Reset Token: "
                        type="text"
                        placeholder="Enter your reset token"
                        value={resetToken}
                        onChange={(e) => setResetToken(e.target.value)}
                    />
                    <InputField
                        label="New Password: "
                        type="password"
                        placeholder="Enter your new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    {result && <p className="result-message">{result}</p>}
                    <Button text="Reset Password" />
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
