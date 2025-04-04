import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles/auth.css';

/**
 * SignUp Component
 * Handles new user registration with first name, last name, email, and password
 */
function SignUp() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /**
   * Handle form submission
   * @param {Event} e - Form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign up:', { firstName, lastName, email, password });
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
        <h1 className="auth-title">Create Account</h1>
      </div>

      {/* Auth Card */}
      <div className="auth-card">
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Name Inputs */}
          <div className="name-inputs">
            <div className="input-group">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                className="form-input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="First name"
              />
            </div>
            <div className="input-group">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                className="form-input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Last name"
              />
            </div>
          </div>

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
              placeholder="Create a password"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="auth-button">
            Sign up
          </button>

          {/* Sign In Link */}
          <p className="auth-link-text">
            Already have an account?{' '}
            <Link to="/signin" className="auth-link">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;