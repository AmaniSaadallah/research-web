import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { FiBookOpen, FiLogOut, FiMenu, FiX, FiPlus } from 'react-icons/fi';
import ArticleManagement from './ArticleManagement';
import './styles/moderator.css';

function ModeratorDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      if (window.innerWidth > 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/signin');
  };

  return (
    <div className="moderator-dashboard">
      <button 
        className="mobile-menu-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <aside className={`moderator-sidebar ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="moderator-logo">
          <span className="logo-text">ResearchConnect</span>
          <span className="logo-subtitle">Moderator Panel</span>
        </div>

        <nav className="moderator-nav">
          <Link
            to="/moderator/articles"
            className={`nav-item ${location.pathname === '/moderator/articles' ? 'active' : ''}`}
            onClick={() => screenWidth <= 1024 && setIsMobileMenuOpen(false)}
          >
            <FiBookOpen size={20} />
            <span>Articles</span>
          </Link>

          <Link
            to="/moderator/add-article"
            className={`nav-item ${location.pathname === '/moderator/add-article' ? 'active' : ''}`}
            onClick={() => screenWidth <= 1024 && setIsMobileMenuOpen(false)}
          >
            <FiPlus size={20} />
            <span>Add Article</span>
          </Link>

          <button onClick={handleLogout} className="nav-item logout-button">
            <FiLogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      <main className="moderator-main">
        <div className="moderator-content">
          <Routes>
            <Route path="/" element={<ArticleManagement />} />
            <Route path="/articles" element={<ArticleManagement />} />
            <Route path="/add-article" element={<ArticleManagement isAdding />} />
          </Routes>
        </div>
      </main>

      {isMobileMenuOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}

export default ModeratorDashboard;