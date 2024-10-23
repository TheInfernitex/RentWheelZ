// // src/components/ProfileModal.js
// import React, { useState } from 'react';
// import Image from 'next/image';
// import '../styles/modal.css';
// import InputField from './InputField';
// import Button from './Button';
// import { useAuth } from '../app/AuthContext';

// const ProfileModal = ({ onClose, className }) => {
//     const [name, setName] = useState('John Doe');
//     const [email, setEmail] = useState('johndoe@example.com');
//     const [password, setPassword] = useState('********');
//     const [editMode, setEditMode] = useState(false);
    
//   const { setIsLoggedIn } = useAuth();  // Get setIsLoggedIn from the context


//     const handleSave = () => {
//         // Logic to save the updated profile details
//         console.log('Profile updated:', { name, email, password });
//         setEditMode(false);
//     };

//     return (
//         <div className={`profmodal profile-modal ${className}`}>
//             <div className="profmodal-content profile-modal-content">
//                 <button className="prof-close-button" onClick={onClose}>×</button>
//                 <h1>Profile</h1>   
//                 {editMode ? (
//                     <form>      
//                         <Image
//                             src="/assets/profileIcon" // Use the root-relative path
//                             alt="Profile Icon" // Provide a descriptive alt text
//                             width={100} // Set the desired width
//                             height={100} // Set the desired height
//                             className='profile-icon' // Add a custom class name
//                         />
//                         <InputField
//                             label="Name: "
//                             type="text"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                         />
//                         <InputField
//                             label="Email: "
//                             type="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                         <InputField
//                             label="Password: "
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                         <Button text="Save" onClick={handleSave} />
//                     </form>
//                 ) : (
//                     <div className="profile-info">
                         
//                         <Image
//                             src="/assets/profileIcon.png" // Use the root-relative path
//                             alt="Profile Icon" // Provide a descriptive alt text
//                             width={100} // Set the desired width
//                             height={100} // Set the desired height
//                             className='profile-icon' // Add a custom class name
//                         />
//                         <p><strong>Name:</strong> {name}</p>
//                         <p><strong>Email:</strong> {email}</p>
//                         <Button text="Edit Profile" onClick={() => {
//                             console.log('in editing mode');
//                             setEditMode(true)
//                         }} />
//                         <Button text="Logout" onClick={() => {
//                             console.log('logging out');
//                             setIsLoggedIn(false);
//                             onClose();
//                         }} />
                        
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ProfileModal;
// src/components/ProfileModal.js
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import '../styles/modal.css';
import InputField from './InputField';
import Button from './Button';
import { useAuth } from '../app/AuthContext';
import axios from 'axios';

const ProfileModal = ({ onClose, className }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [password, setPassword] = useState(''); // Leave empty for security
    const [editMode, setEditMode] = useState(false);

    const { jwtToken, userId, logout } = useAuth(); // Getting jwtToken and logout from useAuth

    // Fetch user profile data on component mount
        const fetchUserProfile = async (userId, jwtToken) => {
            try {
                const response = await axios.get(`http://localhost:8081/api/users/${userId}`, {
                    params: {
                        token: jwtToken // Send JWT as a query parameter
                    }
                });
                const userData = response.data;
                setFirstName(userData.firstName);
                setLastName(userData.lastName);
                setEmail(userData.email);
                setAddress(userData.address);
                setPhoneNo(userData.phoneNo);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };        
        
    useEffect(() => {
        
        if (jwtToken) {
            fetchUserProfile(userId, jwtToken);
        }
    }, [jwtToken]);

    // Handle profile save/update
    const handleSave = async () => {
        try {
            const updatedUser = {
                email,
                firstName,
                lastName,
                password,
                address,
                phoneNo
            };
            await axios.put(`http://localhost:8081/api/users/${userId}`, updatedUser, {
                params: {
                    token: jwtToken // Send token as a query parameter
                }
            });
            console.log('Profile updated:', updatedUser);
            setTimeout(()=>{
                setEditMode(false);
            }, 1000);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };


    // Handle profile deletion
    const handleDeleteAccount = async () => {
        try {
            await axios.delete(`http://localhost:8081/api/users/${userId}`, {
                params: {
                    token: jwtToken // Send token as a query parameter
                }
            }); // Send token as a query parameter
            logout(); // Log the user out after deleting the account
            onClose(); // Close the modal
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };


    return (
        <div className={`profmodal profile-modal ${className}`}>
            <div className="profmodal-content profile-modal-content">
                <button className="prof-close-button" onClick={onClose}>×</button>
                <h1>Profile</h1>
                {editMode ? (
                    <form>
                        <Image
                            src="/assets/profileIcon.png" // Use the root-relative path
                            alt="Profile Icon" // Provide a descriptive alt text
                            width={100} // Set the desired width
                            height={100} // Set the desired height
                            className="profile-icon" // Add a custom class name
                        />
                        <InputField
                            label="First Name: "
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <InputField
                            label="Last Name: "
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <InputField
                            label="Address: "
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <InputField
                            label="Phone No: "
                            type="text"
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                        />
                        <Button text="Save" onClick={handleSave} />
                    </form>
                ) : (
                    <div className="profile-info">
                        <Image
                            src="/assets/profileIcon.png"
                            alt="Profile Icon"
                            width={100}
                            height={100}
                            className="profile-icon"
                        />
                        <p><strong>First Name:</strong> {firstName}</p>
                        <p><strong>Last Name:</strong> {lastName}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Address:</strong> {address}</p>
                        <p><strong>Phone No:</strong> {phoneNo}</p>
                        <Button text="Edit Profile" onClick={() => setEditMode(true)} />
                        <Button text="Delete Account" onClick={handleDeleteAccount} />
                        <Button text="Logout" onClick={() => {
                            logout(); // Trigger logout from AuthContext
                            onClose();
                        }} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileModal;
