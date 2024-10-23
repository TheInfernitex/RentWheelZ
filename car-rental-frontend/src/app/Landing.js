"use client";

import { useState } from 'react';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import ProfileModal from "@/components/ProfileModal";
import '../styles/home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../app/AuthContext';  // Import the context
import CursorFollower from '@/components/CursorFollower';

export default function Landing() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isLoggedIn, userId } = useAuth(); // Use the context
  const [isSlideOut, setIsSlideOut] = useState(false); // New state for sliding out

  const closeProfileModal = () => {
    setIsSlideOut(true); // Set the slide-out state
    setTimeout(() => {
      setIsProfileOpen(false); // After the animation, close the modal
      setIsSlideOut(false); // Reset the slide-out state
    }, 300); // Duration should match the CSS transition time
  };

    return (
      <div className="home-container">
            <CursorFollower />
          <nav className="navbar">
              <h2 className="navbar-title">RentWheelZ</h2>
              <div className="nav-buttons">
                  {!isLoggedIn ? (
                  <>
                      <button className="nav-button" onClick={() => setIsLoginOpen(true)}>Login</button>
                      <button className="nav-button" onClick={() => setIsSignupOpen(true)}>Signup</button>
                  </>
                  ) : (
                  <button className="nav-button" onClick={() => { /* handle profile click */ }}>
                      <FontAwesomeIcon icon={faUser} onClick={() => {
                            console.log('id = ', userId);
                          console.log('profile opened')
                          setIsProfileOpen(true)
                      }}/>
                  </button>
                  )}
              </div>
          </nav>

          {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
          {isSignupOpen && <SignupModal onClose={() => setIsSignupOpen(false)}/>}
          {/* {isProfileOpen && <ProfileModal onClose={() => setIsProfileOpen(false)} className={`profmodal ${isProfileOpen ? 'active' : ''}`} />} */}
          {isProfileOpen && (
        <ProfileModal
          onClose={closeProfileModal}
          className={`profmodal ${isProfileOpen ? 'active' : ''} ${isSlideOut ? 'slide-out' : ''}`}
        />
      )}

          <header className="hero-section">
              <h1>Welcome to RentWheelZ</h1>
              <p>Your one-stop solution for hassle-free car rentals.</p>
          </header>
          <hr />
          <div className='content'>
          <section className="features">
              <h2>Why Choose Us?</h2>
              <div className="feature-list">
                  <div className="feature-item">
                      <h3>Variety</h3>
                      <p>Choose from a variety of cars that fit your style and budget.</p>
                  </div>
                  <div className="feature-item">
                      <h3>Affordable Prices</h3>
                      <p>Enjoy competitive rates without hidden fees.</p>
                  </div>
                  <div className="feature-item">
                      <h3>Easy Booking</h3>
                      <p>Book your car in just a few clicks, anytime and anywhere.</p>
                  </div>
                  <div className="feature-item">
                      <h3>24/7 Support</h3>
                      <p>We're here to assist you around the clock.</p>
                  </div>
              </div>
          </section>
          <section className="features">
              <h2>Exceptional Service</h2>
              <div className="feature-list">
                  <div className="feature-item">
                      <h3>Personalized Experience</h3>
                      <p>Receive tailored services that cater to your specific needs.</p>
                  </div>
                  <div className="feature-item">
                      <h3>Clean and Well-Maintained Vehicles</h3>
                      <p>Drive with confidence in our thoroughly inspected and sanitized cars.</p>
                  </div>
                  <div className="feature-item">
                      <h3>Flexible Rental Terms</h3>
                      <p>Enjoy the freedom of short-term or long-term rentals that suit your plans.</p>
                  </div>
                  <div className="feature-item">
                      <h3>Exclusive Deals</h3>
                      <p>Take advantage of our special offers and discounts for loyal customers.</p>
                  </div>
              </div>
          </section>
          <section className="features">
              <h2>Our Commitment to You</h2>
              <div className="feature-list">
                  <div className="feature-item">
                      <h3>Safety First</h3>
                      <p>Your safety is our priority, with rigorous safety checks and protocols in place.</p>
                  </div>
                  <div className="feature-item">
                      <h3>Local Expertise</h3>
                      <p>Benefit from our knowledge of the best routes and local attractions.</p>
                  </div>
                  <div className="feature-item">
                      <h3>Seamless Returns</h3>
                      <p>Enjoy hassle-free returns with multiple drop-off locations available.</p>
                  </div>
                  <div className="feature-item">
                      <h3>Customer Loyalty Program</h3>
                      <p>Join our loyalty program for exclusive benefits and rewards.</p>
                  </div>
              </div>
          </section>
          </div>

          <hr/>

          <footer className="footer">
              <p>&copy; 2024 RentWheelZ. All rights reserved.</p>
          </footer>
      </div>
  );
}
