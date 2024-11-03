import React, { useState } from 'react';

const ReviewModal = ({ onClose, userId, vehicleId }) => {
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Create the review object
        const review = {
            vehicleId,
            customerId: userId,
            comment,
            rating,
        };

        try {
            // Send the review to the backend
            const response = await fetch('http://localhost:8081/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(review),
            });

            if (response.ok) {
                alert('Review submitted successfully!');
                onClose(); // Close the modal
            } else {
                alert('Failed to submit review');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('An error occurred while submitting your review');
        }

        setTimeout(() => {
            onClose();
        }, 1000);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h2>Leave a Review</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Rating (1-5):
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            required
                        />
                    </label>
                    <label>
                        Comment:
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>

            <style jsx>{`
                .modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(0, 0, 0, 0.5);
                }
                .modal-content {
                    background: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    width: 400px;
                    position: relative;
                }
                .close-button {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: transparent;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                }
                form {
                    display: flex;
                    flex-direction: column;
                }
                label {
                    margin-bottom: 10px;
                }
                input[type='number'],
                textarea {
                    width: 100%;
                    padding: 8px;
                    margin-top: 4px;
                }
                button {
                    padding: 10px;
                    background: #0070f3;
                    color: #fff;
                    border: none;
                    cursor: pointer;
                    border-radius: 4px;
                }
            `}</style>
        </div>
    );
};

export default ReviewModal;
