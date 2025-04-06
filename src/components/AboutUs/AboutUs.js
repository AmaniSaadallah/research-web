import React from 'react';
import Navbar from '../landing/Navbar';
import './AboutUs.css'; 

const AboutUs = () => {
  return (
    <div className="about-container">
      <Navbar /> 
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
