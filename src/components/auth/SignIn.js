import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles/auth.css';

/**
 * SignIn Component
 * Handles user authentication with email and password
 */
function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  /**
   * Handle form submission
   * @param {Event} e - Form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Demo admin credentials check
    const isAdmin = email === 'admin@example.com' && password === 'admin123';
    
    // Create user data with appropriate role
    const userData = {
      firstName: isAdmin ? 'Admin' : 'User',
      lastName: isAdmin ? 'System' : 'Demo',
      email: email,
      role: isAdmin ? 'admin' : 'user', // Set role based on credentials
      joinDate: new Date().toISOString(),
      interests: ['Artificial Intelligence', 'Natural Language Processing', 'Cybersecurity']
    };
    
    // Save user data to localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Redirect based on role
    navigate(isAdmin ? '/admin' : '/user');
  };

  return (
    <div className="auth-container">
      <button 
        onClick={() => navigate('/')} 
        className="back-button"
        aria-label="Back to home">
        <FiArrowLeft /> Back to home
      </button>

      {/* Header Section */}
      <div className="auth-header">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to continue</p>
      </div>

      {/* Auth Card */}
      <div className="auth-card">
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Email Input */}
          <div className="input-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div className="input-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="auth-button">
            Sign in
          </button>

          {/* Demo Admin Credentials Info */}
          <div className="demo-credentials">
            <strong>Demo Admin Access:</strong>
            <br />
            Email: admin@example.com
            <br />
            Password: admin123
          </div>

          {/* Sign Up Link */}
          <p className="auth-link-text">
            Don't have an account?{' '}
            <Link to="/signup" className="auth-link">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignIn;