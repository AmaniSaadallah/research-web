import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiMail, FiCalendar, FiBook, FiEdit2, FiCheck, FiX } from 'react-icons/fi';
import './Profile.css';

function Profile() {
  const defaultUser = JSON.parse(localStorage.getItem('user')) || {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    joinDate: new Date().toISOString(),
    interests: ['Intelligence Artificielle', 'NLP', 'Cybersécurité']
  };

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(defaultUser);
  const [newPassword, setNewPassword] = useState('');
  const [selectedInterests, setSelectedInterests] = useState(defaultUser.interests);

  const availableInterests = [
    'Intelligence Artificielle',
    'Traitement du langage naturel (NLP)',
    'Traitement d\'images',
    'Cybersécurité',
    'Machine Learning',
    'Deep Learning',
    'Robotique',
    'Big Data'
  ];

  const handleInterestToggle = (interest) => {
    setSelectedInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...userData,
      interests: selectedInterests,
      ...(newPassword && { password: newPassword })
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUserData(updatedUser);
    setIsEditing(false);
    setNewPassword('');
  };

  return (
    <div className="profile-container">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <Link to="/user" className="nav-logo">
            ResearchConnect
          </Link>
          <div className="nav-links">
            <Link to="/user" className="nav-link">Articles</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
            <Link to="/" className="nav-button primary">Déconnexion</Link>
          </div>
        </div>
      </nav>

      <div className="profile-content">
        <div className="profile-header">
          <div className="profile-avatar">
            <FiUser size={40} />
          </div>
          <h1 className="profile-name">{userData.firstName} {userData.lastName}</h1>
          <button 
            className="edit-button"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? <FiX /> : <FiEdit2 />}
            {isEditing ? 'Annuler' : 'Modifier le profil'}
          </button>
        </div>

        <div className="profile-info">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="edit-form">
              <div className="form-group">
                <label>Prénom</label>
                <input
                  type="text"
                  value={userData.firstName}
                  onChange={(e) => setUserData({...userData, firstName: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Nom</label>
                <input
                  type="text"
                  value={userData.lastName}
                  onChange={(e) => setUserData({...userData, lastName: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({...userData, email: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Nouveau mot de passe (laisser vide pour ne pas changer)</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nouveau mot de passe"
                />
              </div>

              <div className="form-group">
                <label>Domaines d'intérêt</label>
                <div className="interests-grid">
                  {availableInterests.map(interest => (
                    <label key={interest} className="interest-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedInterests.includes(interest)}
                        onChange={() => handleInterestToggle(interest)}
                      />
                      {interest}
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="save-button">
                <FiCheck /> Sauvegarder les modifications
              </button>
            </form>
          ) : (
            <div className="info-card">
              <div className="info-item">
                <FiMail />
                <div>
                  <h3>Email</h3>
                  <p>{userData.email}</p>
                </div>
              </div>
              <div className="info-item">
                <FiCalendar />
                <div>
                  <h3>Date d'inscription</h3>
                  <p>{new Date(userData.joinDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="info-item">
                <FiBook />
                <div>
                  <h3>Domaines d'intérêt</h3>
                  <div className="interests-tags">
                    {userData.interests.map(interest => (
                      <span key={interest} className="interest-tag">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;