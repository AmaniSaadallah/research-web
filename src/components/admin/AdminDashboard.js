import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { FiUsers, FiBookOpen, FiGrid, FiUserCheck, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import DomainManagement from './DomainManagement';
import PublicationManagement from './PublicationManagement';
import ResearcherManagement from './ResearcherManagement';
import UserAccountManagement from './UserAccountManagement';
import './styles/admin.css';

function AdminDashboard() {
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
    <div className="admin-dashboard">
      <button 
        className="mobile-menu-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <aside className={`admin-sidebar ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="admin-logo">
          <span className="logo-text">ResearchConnect</span>
          <span className="logo-subtitle">Admin Panel</span>
        </div>

        <nav className="admin-nav">
          <Link
            to="/admin/researchers"
            className={`nav-item ${location.pathname === '/admin/researchers' ? 'active' : ''}`}
            onClick={() => screenWidth <= 1024 && setIsMobileMenuOpen(false)}
          >
            <FiUsers size={20} />
            <span>Researchers</span>
          </Link>

          <Link
            to="/admin/publications"
            className={`nav-item ${location.pathname === '/admin/publications' ? 'active' : ''}`}
            onClick={() => screenWidth <= 1024 && setIsMobileMenuOpen(false)}
          >
            <FiBookOpen size={20} />
            <span>Publications</span>
          </Link>

          <Link
            to="/admin/domains"
            className={`nav-item ${location.pathname === '/admin/domains' ? 'active' : ''}`}
            onClick={() => screenWidth <= 1024 && setIsMobileMenuOpen(false)}
          >
            <FiGrid size={20} />
            <span>Domains</span>
          </Link>

          <Link
            to="/admin/users"
            className={`nav-item ${location.pathname === '/admin/users' ? 'active' : ''}`}
            onClick={() => screenWidth <= 1024 && setIsMobileMenuOpen(false)}
          >
            <FiUserCheck size={20} />
            <span>User Accounts</span>
          </Link>

          <button onClick={handleLogout} className="nav-item logout-button">
            <FiLogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      <main className="admin-main">
        <div className="admin-content">
          <Routes>
            <Route path="/" element={<ResearcherManagement />} />
            <Route path="/researchers" element={<ResearcherManagement />} />
            <Route path="/publications" element={<PublicationManagement />} />
            <Route path="/domains" element={<DomainManagement />} />
            <Route path="/users" element={<UserAccountManagement />} />
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

export default AdminDashboard;