import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSend, FiX } from 'react-icons/fi';
import './demand.css';

function ModeratorRequest() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    motivation: '',
    experience: '',
    specialization: '',
    publications: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simuler l'envoi de la demande
    setSubmitted(true);
    // Dans une vraie application, envoyer les données à une API
    console.log('Demande envoyée:', formData);
    
    // Réinitialiser le formulaire après 3 secondes
    setTimeout(() => {
      setSubmitted(false);
      setIsModalOpen(false);
      setFormData({
        motivation: '',
        experience: '',
        specialization: '',
        publications: ''
      });
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <>
      <button 
        className="become-moderator-button"
        onClick={() => setIsModalOpen(true)}
      >
        Devenir Modérateur
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button 
              className="close-modal"
              onClick={() => setIsModalOpen(false)}
            >
              <FiX />
            </button>
            
            <h2 className="modal-title">Demande pour devenir Modérateur</h2>
            
            {submitted ? (
              <div className="success-message">
                <FiSend size={40} />
                <h3>Demande envoyée avec succès!</h3>
                <p>Nous examinerons votre demande et vous contacterons bientôt.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="moderator-form">
                <div className="form-group">
                  <label htmlFor="motivation">
                    Motivation
                    <span className="required">*</span>
                  </label>
                  <textarea
                    id="motivation"
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleChange}
                    placeholder="Expliquez pourquoi vous souhaitez devenir modérateur..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="experience">
                    Expérience en recherche
                    <span className="required">*</span>
                  </label>
                  <textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Décrivez votre expérience en recherche..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="specialization">
                    Domaine de spécialisation
                    <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    placeholder="Ex: Intelligence Artificielle, NLP, etc."
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="publications">
                    Publications et contributions
                  </label>
                  <textarea
                    id="publications"
                    name="publications"
                    value={formData.publications}
                    onChange={handleChange}
                    placeholder="Listez vos publications et contributions scientifiques..."
                  />
                </div>

                <button type="submit" className="submit-button">
                  <FiSend />
                  Envoyer la demande
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ModeratorRequest;