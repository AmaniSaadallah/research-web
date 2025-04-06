import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiUser, FiBookOpen, FiSearch, FiMenu, FiX, FiPhone, FiMapPin } from 'react-icons/fi';
import './ResearchersList.css';

const demoResearchers = [
  {
    id: 1,
    firstName: "Sophie",
    lastName: "Martin",
    title: "Dr.",
    specialization: "Natural Language Processing",
    domain: "NLP",
    institution: "University of Paris",
    email: "sophie.martin@univ-paris.fr",
    publications: 25
  },
  {
    id: 2,
    firstName: "Thomas",
    lastName: "Bernard",
    title: "Prof.",
    specialization: "Artificial Intelligence",
    domain: "AI",
    institution: "École Polytechnique",
    email: "t.bernard@polytechnique.fr",
    publications: 42
  },
  {
    id: 3,
    firstName: "Julie",
    lastName: "Dubois",
    title: "Dr.",
    specialization: "Cybersecurity",
    domain: "Security",
    institution: "INSA Lyon",
    email: "j.dubois@insa-lyon.fr",
    publications: 18
  },
  {
    id: 4,
    firstName: "Michael",
    lastName: "Brown",
    title: "Prof.",
    specialization: "Machine Learning",
    domain: "AI",
    institution: "Imperial College London",
    email: "m.brown@imperial.ac.uk",
    publications: 31
  }
];

function ResearchersList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user')) || {};

  const domains = [...new Set(demoResearchers.map(r => r.domain))];

  const filteredResearchers = demoResearchers.filter(researcher => {
    const matchesSearch = (researcher.firstName + ' ' + researcher.lastName)
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDomain = selectedDomain === 'all' || researcher.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="user-container">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <Link to="/user" className="nav-logo">
            ResearchConnect
          </Link>
          <button className="mobile-menu-button" onClick={toggleMobileMenu} aria-label="Toggle menu">
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/user" className="nav-link">Dashboard</Link>
            <Link to="/researchers" className="nav-link">Moderators</Link>
            <Link to="/about" className="nav-link">About</Link>
            <div className="user-info">
              <Link to="/profile" className="nav-link">
                <FiUser className="user-icon" />
                {user.firstName} {user.lastName}
              </Link>
            </div>
            <Link to="/" className="nav-button primary" onClick={() => localStorage.removeItem('user')}>
              Logout
            </Link>
          </div>
        </div>
      </nav>

      <div className="researchers-page">
        <h1>Researchers Directory</h1>
        
        <div className="researchers-search-section">
          <div className="researchers-search-container">
            <div className="researchers-search-box">
              <FiSearch className="researchers-search-icon" />
              <input
                type="text"
                placeholder="Search researchers by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="researchers-search-input"
              />
            </div>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="domain-select"
            >
              <option value="all">All Domains</option>
              {domains.map(domain => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="researchers-grid">
          {filteredResearchers.map(researcher => (
            <div key={researcher.id} className="researcher-card">
              <div className="researcher-avatar">
                <FiUser size={40} />
              </div>
              <div className="researcher-info">
                <h2>{researcher.title} {researcher.firstName} {researcher.lastName}</h2>
                <p className="specialization">{researcher.specialization}</p>
                <p className="institution">{researcher.institution}</p>
                <div className="researcher-stats">
                  <span><FiBookOpen /> {researcher.publications} publications</span>
                  <a href={`mailto:${researcher.email}`} className="researcher-email">
                    <FiMail /> Contact
                  </a>
                </div>
              </div>
            </div>
          ))}
          {filteredResearchers.length === 0 && (
            <div className="no-results">
              <p>No researchers found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="user-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About</h3>
            <p>ResearchConnect is a platform dedicated to sharing and collaboration in academic research.</p>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <div className="contact-info">
              <span><FiMail /> contact@researchconnect.com</span>
              <span><FiPhone /> +216 XX XXX XXX</span>
              <span><FiMapPin /> Tunisia</span>
            </div>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <div className="quick-links">
              <Link to="/user">Articles</Link>
              <Link to="/profile">My Profile</Link>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ResearchConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default ResearchersList;