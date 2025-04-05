import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiUser, FiMenu, FiX, FiEye, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { Document, Page, pdfjs } from 'react-pdf';
import './user.css';
import ModeratorRequest from './demand';

// Configuration of PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// Demo articles
const demoArticles = [
  {
    id: 1,
    title: "Advances in Natural Language Processing for Contextual Understanding",
    category: "NLP",
    excerpt: "Latest innovations in NLP enabling better context understanding in automated conversations.",
    author: "Dr. Sophie Martin",
    date: "2025-03-15",
    pdfUrl: "https://fac.umc.edu.dz/fstech/cours/Electronique/Master%20AII/TD%20Electronique%20Appliqu%C3%A9e.pdf"
  },
  {
    id: 2,
    title: "Artificial Intelligence and Real-time Object Detection",
    category: "AI",
    excerpt: "New approaches to improve object detection accuracy using deep neural networks.",
    author: "Prof. Thomas Bernard",
    date: "2025-03-20",
    pdfUrl: "https://example.com/article2.pdf"
  },
  {
    id: 3,
    title: "Cybersecurity: Protection Against Machine Learning Attacks",
    category: "Cybersecurity",
    excerpt: "Innovative methods to secure systems against attacks using artificial intelligence.",
    author: "Dr. Julie Dubois",
    date: "2025-03-25"
  },
  {
    id: 4,
    title: "Medical Image Processing using Deep Learning",
    category: "Image",
    excerpt: "Applications of deep learning to improve the accuracy of medical diagnosis through imaging.",
    author: "Dr. Marc Dupont",
    date: "2025-03-28"
  }
];

function PDFViewer({ pdfUrl, onClose }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="pdf-viewer-overlay">
      <div className="pdf-viewer-container">
        <button className="close-button" onClick={onClose}>×</button>
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="pdf-loading">Loading PDF...</div>}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <div className="pdf-controls">
          <button
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            Previous
          </button>
          <span>
            Page {pageNumber} of {numPages}
          </span>
          <button
            disabled={pageNumber >= numPages}
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function User() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [articles, setArticles] = useState(demoArticles);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const user = JSON.parse(localStorage.getItem('user')) || {};

  // Handle scroll for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    
    const filteredArticles = demoArticles.filter(article => {
      const matchesDomain = selectedDomain === 'all' || article.category.toLowerCase() === selectedDomain;
      const matchesQuery = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDomain && matchesQuery;
    });
    
    setArticles(filteredArticles);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="user-container">
      {/* Navigation */}
      <nav className={`nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/user" className="nav-logo">
            ResearchConnect
          </Link>
          <button className="mobile-menu-button" onClick={toggleMobileMenu} aria-label="Toggle menu">
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            <Link to="/user" className="nav-link">Articles</Link>
            <Link to="/researchers" className="nav-link">Chercheurs</Link>
            {user.role === 'admin' && (
              <Link to="/admin/" className="nav-link admin-link">
                Admin Dashboard
              </Link>
            )}
            <div className="user-info">
              <Link to="/profile" className="nav-link">
                <FiUser className="user-icon" />
                {user.firstName} {user.lastName}
              </Link>
            </div>
            <Link to="/" className="nav-button primary" onClick={() => localStorage.removeItem('user')}>
              Log out
            </Link>
          </div>
        </div>
      </nav>

      {/* Search Section */}
      <section className="search-section">
        <div className="search-container">
          <h1 className="search-title">Search Articles</h1>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              className="search-input"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="search-select"
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
            >
              <option value="all">All domains</option>
              <option value="nlp">Natural Language Processing</option>
              <option value="image">Image Processing</option>
              <option value="ai">Artificial Intelligence</option>
              <option value="cybersecurity">Cybersecurity</option>
            </select>
          </form>
        </div>
      </section>

      {/* Articles Section */}
      <section className="articles-section">
        <div className="articles-container">
          <div className="articles-grid">
            {articles.map(article => (
              <article key={article.id} className="article-card">
                <div className="article-category">{article.category}</div>
                <h2 className="article-title">{article.title}</h2>
                <p className="article-excerpt">{article.excerpt}</p>
                <div className="article-meta">
                  <span>
                    <FiUser style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                    {article.author}
                  </span>
                  <span>
                    <FiCalendar style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                    {article.date}
                  </span>
                </div>
                <div className="article-actions">
                 
                  <a 
                    href={article.pdfUrl} 
                    className="action-button download"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiEye /> View PDF
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PDF Viewer */}
      {selectedPdf && (
        <PDFViewer 
          pdfUrl={selectedPdf} 
          onClose={() => setSelectedPdf(null)}
        />
      )}

      {/* Moderator Request Button */}
      <ModeratorRequest />

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
              <span><FiMapPin /> Tunis, Tunisia</span>
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

export default User;