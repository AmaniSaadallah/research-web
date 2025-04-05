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
    // Simulate request submission
    setSubmitted(true);
    // In a real application, send data to an API
    console.log('Request sent:', formData);
    
    // Reset form after 3 seconds
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
        Become a Moderator
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
            
            <h2 className="modal-title">Request to Become a Moderator</h2>
            
            {submitted ? (
              <div className="success-message">
                <FiSend size={40} />
                <h3>Request sent successfully!</h3>
                <p>We will review your request and contact you soon.</p>
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
                    placeholder="Explain why you want to become a moderator..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="experience">
                    Research Experience
                    <span className="required">*</span>
                  </label>
                  <textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Describe your research experience..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="specialization">
                    Area of Specialization
                    <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    placeholder="E.g., Artificial Intelligence, NLP, etc."
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="publications">
                    Publications and Contributions
                  </label>
                  <textarea
                    id="publications"
                    name="publications"
                    value={formData.publications}
                    onChange={handleChange}
                    placeholder="List your scientific publications and contributions..."
                  />
                </div>

                <button type="submit" className="submit-button">
                  <FiSend />
                  Send Request
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