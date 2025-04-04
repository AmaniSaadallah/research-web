import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiUser, FiMenu, FiX, FiDownload, FiEye, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { Document, Page, pdfjs } from 'react-pdf';
import './user.css';
import ModeratorRequest from './demand';

// Configuration du worker PDF
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// Articles de démonstration
const demoArticles = [
  {
    id: 1,
    title: "Avancées en traitement du langage naturel pour la compréhension contextuelle",
    category: "NLP",
    excerpt: "Les dernières innovations en NLP permettant une meilleure compréhension du contexte dans les conversations automatisées.",
    author: "Dr. Sophie Martin",
    date: "2025-03-15",
    pdfUrl: "https://fac.umc.edu.dz/fstech/cours/Electronique/Master%20AII/TD%20Electronique%20Appliqu%C3%A9e.pdf"
  },
  {
    id: 2,
    title: "Intelligence artificielle et détection d'objets en temps réel",
    category: "IA",
    excerpt: "Nouvelles approches pour améliorer la précision de la détection d'objets en utilisant des réseaux de neurones profonds.",
    author: "Prof. Thomas Bernard",
    date: "2025-03-20",
    pdfUrl: "https://example.com/article2.pdf"
  },
  {
    id: 3,
    title: "Cybersécurité : Protection contre les attaques par apprentissage automatique",
    category: "Cybersécurité",
    excerpt: "Méthodes innovantes pour sécuriser les systèmes contre les attaques utilisant l'intelligence artificielle.",
    author: "Dr. Julie Dubois",
    date: "2025-03-25"
  },
  {
    id: 4,
    title: "Traitement d'images médicales par deep learning",
    category: "Image",
    excerpt: "Applications du deep learning pour améliorer la précision du diagnostic médical par imagerie.",
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
          loading={<div className="pdf-loading">Chargement du PDF...</div>}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <div className="pdf-controls">
          <button
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            Précédent
          </button>
          <span>
            Page {pageNumber} sur {numPages}
          </span>
          <button
            disabled={pageNumber >= numPages}
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            Suivant
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

  // Gérer le scroll pour la navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Gérer la recherche
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
            <div className="user-info">
              <Link to="/profile" className="nav-link">
                <FiUser className="user-icon" />
                {user.firstName} {user.lastName}
              </Link>
            </div>
            <Link to="/" className="nav-button primary" onClick={() => localStorage.removeItem('user')}>
              Déconnexion
            </Link>
          </div>
        </div>
      </nav>

      {/* Section de recherche */}
      <section className="search-section">
        <div className="search-container">
          <h1 className="search-title">Rechercher des Articles</h1>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              className="search-input"
              placeholder="Rechercher des articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="search-select"
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
            >
              <option value="all">Tous les domaines</option>
              <option value="nlp">Traitement du langage naturel</option>
              <option value="image">Traitement d'images</option>
              <option value="ia">Intelligence Artificielle</option>
              <option value="cybersécurité">Cybersécurité</option>
            </select>
          </form>
        </div>
      </section>

      {/* Section des articles */}
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
                    <FiEye /> Voir le PDF
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

      {/* Bouton pour devenir modérateur */}
      <ModeratorRequest />

      {/* Footer */}
      <footer className="user-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>À propos</h3>
            <p>ResearchConnect est une plateforme dédiée au partage et à la collaboration dans le domaine de la recherche académique.</p>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <div className="contact-info">
              <span><FiMail /> contact@researchconnect.com</span>
              <span><FiPhone /> +216 XX XXX XXX</span>
              <span><FiMapPin /> Tunis, Tunisie</span>
            </div>
          </div>
          <div className="footer-section">
            <h3>Liens rapides</h3>
            <div className="quick-links">
              <Link to="/user">Articles</Link>
              <Link to="/profile">Mon Profil</Link>
              <a href="#">Politique de confidentialité</a>
              <a href="#">Conditions d'utilisation</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ResearchConnect. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

export default User;