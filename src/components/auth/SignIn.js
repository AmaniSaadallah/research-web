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
    // Simulate a successful login with user data
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: email,
      joinDate: new Date().toISOString(),
      interests: ['Intelligence Artificielle', 'NLP', 'Cybersécurité']
    };
    
    // Save user data
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Redirect to user page
    navigate('/user');
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
      </div>

      {/* Auth Card */}
      <div className="auth-card">
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Email Input */}
          <div className="input-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
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
            <label htmlFor="password" className="form-label">
              Password
            </label>
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

          {/* Sign Up Link */}
          <p className="auth-link-text">
            Don't have an account?{' '}
            <Link to="/signup" className="auth-link">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignIn;