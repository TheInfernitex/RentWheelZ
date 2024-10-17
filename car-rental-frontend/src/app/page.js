// import Link from "next/link";
// import '../styles/home.css';

// export default function Home() {
//   return (
//     <div className="home-container">
//       <header className="hero-section">
//         <h1>Welcome to RentWheelZ</h1>
//         <p>Your one-stop solution for hassle-free car rentals.</p>
//         <div className="cta-buttons">
//           <Link href="/login">
//             <button className="cta-button">Login</button>
//           </Link>
//           <Link href="/signup">
//             <button className="cta-button">Signup</button>
//           </Link>
//         </div>
//       </header>

//       <section className="features">
//         <h2>Why Choose Us?</h2>
//         <div className="feature-list">
//           <div className="feature-item">
//             <h3>Wide Selection of Cars</h3>
//             <p>Choose from a variety of cars that fit your style and budget.</p>
//           </div>
//           <div className="feature-item">
//             <h3>Affordable Prices</h3>
//             <p>Enjoy competitive rates without hidden fees.</p>
//           </div>
//           <div className="feature-item">
//             <h3>Easy Booking Process</h3>
//             <p>Book your car in just a few clicks, anytime and anywhere.</p>
//           </div>
//           <div className="feature-item">
//             <h3>24/7 Customer Support</h3>
//             <p>We're here to assist you around the clock.</p>
//           </div>
//         </div>
//       </section>

//       <footer className="footer">
//         <p>&copy; 2024 RentWheelZ. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }
import Link from "next/link";
import '../styles/home.css';

export default function Home() {
  return (
    <div className="home-container">
      <nav className="navbar">
        <h2 className="navbar-title">RentWheelZ</h2>
        <div className="nav-buttons">
          <Link href="/login">
            <button className="nav-button">Login</button>
          </Link>
          <Link href="/signup">
            <button className="nav-button">Signup</button>
          </Link>
        </div>
      </nav>

      <header className="hero-section">
        <h1>Welcome to RentWheelZ</h1>
        <p>Your one-stop solution for hassle-free car rentals.</p>
      </header>

      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-list">
          <div className="feature-item">
            <h3>Wide Selection of Cars</h3>
            <p>Choose from a variety of cars that fit your style and budget.</p>
          </div>
          <div className="feature-item">
            <h3>Affordable Prices</h3>
            <p>Enjoy competitive rates without hidden fees.</p>
          </div>
          <div className="feature-item">
            <h3>Easy Booking Process</h3>
            <p>Book your car in just a few clicks, anytime and anywhere.</p>
          </div>
          <div className="feature-item">
            <h3>24/7 Customer Support</h3>
            <p>We're here to assist you around the clock.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 RentWheelZ. All rights reserved.</p>
      </footer>
    </div>
  );
}

