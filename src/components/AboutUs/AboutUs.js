import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';
import './AboutUs.css'; 

const AboutUs = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user data
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="about-container">
      {/* Custom navigation for AboutUs */}
      <nav className="nav">
        <div className="nav-container">
          <Link to="/" className="nav-logo">ResearchConnect</Link>
          <button className="mobile-menu-button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-link">Home</Link>
            {user ? (
              <>
                <Link to="/user" className="nav-link">Dashboard</Link>
                <Link to="/about" className="nav-link">About</Link>
                <div className="user-info">
                  <Link to="/profile" className="nav-link">
                    <FiUser className="user-icon" />
                    {user.firstName} {user.lastName}
                  </Link>
                </div>
                <Link 
                  to="/" 
                  className="nav-button primary"
                  onClick={() => {
                    localStorage.removeItem('user');
                    setUser(null);
                  }}
                >
                  Log out
                </Link>
              </>
            ) : (
              <><Link to="/about" className="nav-link">About</Link>
                <Link to="/signin" className="nav-button secondary">Log in</Link>
                <Link to="/signup" className="nav-button primary">Join for free</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Title "About Us" */}
      <h1 className="about-title">About Us</h1>

      {/* Image */}
      <img className="about-image" src="images.jpg" alt="Our Team" />

      {/* Section 1 */}
      <div className="about-section">
        <h2>Our Mission</h2>
        <p>
          Our goal is to highlight innovation in artificial intelligence to solve complex challenges across various industries. We believe in a future where AI transforms industries and enhances everyday life.
        </p>
      </div>

      {/* Section 2 */}
      <div className="about-section">
        <h2>Our Technologies</h2>
        <p>
          We use the latest technologies in natural language processing (NLP), AI, and cybersecurity to provide robust solutions tailored to our clients' specific needs.
        </p>
      </div>

      {/* Section 3 */}
      <div className="about-section">
        <h2>Our Team</h2>
        <p>
          Made up of experts in AI, web development, and security, our team is passionate about creating solutions that redefine what's possible with artificial intelligence.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
