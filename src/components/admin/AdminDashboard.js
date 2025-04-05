import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { FiUsers, FiBookOpen, FiGrid, FiUserCheck, FiLogOut } from 'react-icons/fi';
import DomainManagement from './DomainManagement';
import PublicationManagement from './PublicationManagement';
import ResearcherManagement from './ResearcherManagement';
import UserAccountManagement from './UserAccountManagement';
import './styles/admin.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/signin');
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          ResearchConnect
          <span>Admin Dashboard</span>
        </div>

        <nav className="admin-nav">
          <Link
            to="/admin/researchers"
            className={`nav-item ${location.pathname === '/admin/researchers' ? 'active' : ''}`}
          >
            <FiUsers size={20} />
            Researcher Management
          </Link>

          <Link
            to="/admin/publications"
            className={`nav-item ${location.pathname === '/admin/publications' ? 'active' : ''}`}
          >
            <FiBookOpen size={20} />
            Publication Management
          </Link>

          <Link
            to="/admin/domains"
            className={`nav-item ${location.pathname === '/admin/domains' ? 'active' : ''}`}
          >
            <FiGrid size={20} />
            Domain Management
          </Link>

          <Link
            to="/admin/users"
            className={`nav-item ${location.pathname === '/admin/users' ? 'active' : ''}`}
          >
            <FiUserCheck size={20} />
            User Account Management
          </Link>

          <button onClick={handleLogout} className="nav-item">
            <FiLogOut size={20} />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <Routes>
          <Route path="/" element={<ResearcherManagement />} />
          <Route path="/researchers" element={<ResearcherManagement />} />
          <Route path="/publications" element={<PublicationManagement />} />
          <Route path="/domains" element={<DomainManagement />} />
          <Route path="/users" element={<UserAccountManagement />} />
        </Routes>
      </main>
    </div>
  );
}

export default AdminDashboard;