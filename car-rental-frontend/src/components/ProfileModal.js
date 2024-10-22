// src/components/ProfileModal.js
import React, { useState } from 'react';
import Image from 'next/image';
import '../styles/modal.css';
import InputField from './InputField';
import Button from './Button';
import { useAuth } from '../app/AuthContext';

const ProfileModal = ({ onClose, className }) => {
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('johndoe@example.com');
    const [password, setPassword] = useState('********');
    const [editMode, setEditMode] = useState(false);
    
  const { setIsLoggedIn } = useAuth();  // Get setIsLoggedIn from the context


    const handleSave = () => {
        // Logic to save the updated profile details
        console.log('Profile updated:', { name, email, password });
        setEditMode(false);
    };

    return (
        <div className={`profmodal profile-modal ${className}`}>
            <div className="profmodal-content profile-modal-content">
                <button className="prof-close-button" onClick={onClose}>×</button>
                <h2>Profile</h2>   
                {editMode ? (
                    <form>      
                        <Image
                            src="/assets/profileIcon" // Use the root-relative path
                            alt="Profile Icon" // Provide a descriptive alt text
                            width={100} // Set the desired width
                            height={100} // Set the desired height
                            className='profile-icon' // Add a custom class name
                        />
                        <InputField
                            label="Name: "
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <InputField
                            label="Email: "
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <InputField
                            label="Password: "
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button text="Save" onClick={handleSave} />
                    </form>
                ) : (
                    <div className="profile-info">
                         
                        <Image
                            src="/assets/profileIcon.png" // Use the root-relative path
                            alt="Profile Icon" // Provide a descriptive alt text
                            width={100} // Set the desired width
                            height={100} // Set the desired height
                            className='profile-icon' // Add a custom class name
                        />
                        <p><strong>Name:</strong> {name}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <Button text="Edit Profile" onClick={() => {
                            console.log('in editing mode');
                            setEditMode(true)
                        }} />
                        <Button text="Logout" onClick={() => {
                            console.log('logging out');
                            setIsLoggedIn(false);
                            onClose();
                        }} />
                        
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileModal;
