import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiUsers, FiBookOpen, FiMenu, FiX } from 'react-icons/fi';
import './styles/landing.css';

function Landing() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Handle scroll for nav
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Initialize sections as visible if they're in view
    const initializeVisibility = () => {
      const sections = [featuresRef.current, statsRef.current, ctaRef.current];
      sections.forEach(section => {
        if (section && isElementInViewport(section)) {
          section.classList.add('visible');
        }
      });
    };

    // Check if element is in viewport
    const isElementInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };

    // Intersection Observer setup
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '20px'
    });

    // Observe elements
    [featuresRef, statsRef, ctaRef].forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    // Initial visibility check
    initializeVisibility();

    // Event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', initializeVisibility);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', initializeVisibility);
      observer.disconnect();
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="landing">
      {/* Navigation */}
      <nav className={`nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            ResearchConnect
          </Link>
          <button className="mobile-menu-button" onClick={toggleMobileMenu} aria-label="Toggle menu">
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            <Link to="#features" className="nav-link">Features</Link>
            <Link to="#about" className="nav-link">About</Link>
            <Link to="/signin" className="nav-button secondary">Log in</Link>
            <Link to="/signup" className="nav-button primary">Join for free</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Discover Research, Collaborate, and Share Knowledge
          </h1>
          <p className="hero-subtitle">
            Join millions of researchers worldwide in sharing and discovering scientific knowledge
          </p>
          <div className="hero-cta">
            <Link to="/signup" className="nav-button primary">
              Join for free
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="features-container">
          <div className="features-grid fade-in" ref={featuresRef}>
            <div className="feature-card">
              <FiSearch className="feature-icon" />
              <h3 className="feature-title">Discover Research</h3>
              <p className="feature-text">
                Access millions of publications, research papers, and connect with researchers in your field
              </p>
            </div>
            <div className="feature-card">
              <FiUsers className="feature-icon" />
              <h3 className="feature-title">Connect & Collaborate</h3>
              <p className="feature-text">
                Build your network, find potential collaborators, and engage with experts in your field
              </p>
            </div>
            <div className="feature-card">
              <FiBookOpen className="feature-icon" />
              <h3 className="feature-title">Share Your Work</h3>
              <p className="feature-text">
                Upload your research, get feedback from peers, and increase your work's visibility
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stats-container">
          <div className="stats-grid fade-in" ref={statsRef}>
            <div className="stat-item">
              <span className="stat-number">20M+</span>
              <span className="stat-label">Members</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">135M+</span>
              <span className="stat-label">Publications</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5K+</span>
              <span className="stat-label">Institutions</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">190+</span>
              <span className="stat-label">Countries</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-container">
          <div className="cta-content fade-in" ref={ctaRef}>
            <h2 className="cta-title">Ready to advance your research?</h2>
            <p className="cta-text">
              Join our global community of researchers and start sharing your work today
            </p>
            <Link to="/signup" className="nav-button primary">
              Get started now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;