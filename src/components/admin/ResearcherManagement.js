import React, { useState } from 'react';
import { FiSearch, FiEdit2, FiTrash2, FiUserPlus, FiSave, FiX } from 'react-icons/fi';

function ResearcherManagement() {
  const [researchers, setResearchers] = useState([
    {
      id: 1,
      name: "Dr. Sophie Martin",
      email: "sophie.martin@univ-paris.fr",
      specialization: "Natural Language Processing",
      domains: ["NLP", "AI"],
      publications: 25
    },
    // Add more demo researchers here
  ]);

  const [editingResearcher, setEditingResearcher] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newResearcher, setNewResearcher] = useState({
    name: '',
    email: '',
    specialization: '',
    domains: [],
    publications: 0
  });

  const handleEdit = (researcher) => {
    setEditingResearcher({ ...researcher });
  };

  const handleSave = () => {
    if (editingResearcher) {
      setResearchers(researchers.map(r => 
        r.id === editingResearcher.id ? editingResearcher : r
      ));
      setEditingResearcher(null);
    }
  };

  const handleDelete = (id) => {
    setResearchers(researchers.filter(r => r.id !== id));
  };

  const handleAdd = () => {
    const id = Math.max(...researchers.map(r => r.id)) + 1;
    setResearchers([...researchers, { ...newResearcher, id }]);
    setNewResearcher({
      name: '',
      email: '',
      specialization: '',
      domains: [],
      publications: 0
    });
    setShowAddForm(false);
  };

  const filteredResearchers = researchers.filter(researcher =>
    researcher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    researcher.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="management-component">
      <div className="management-header">
        <h1 className="page-title">Researchers</h1>
        <div className="header-actions">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search researchers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="add-button" onClick={() => setShowAddForm(true)}>
            <FiUserPlus /> Add Researcher
          </button>
        </div>
      </div>

      <div className="table-wrapper">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Specialization</th>
                <th>Domains</th>
                <th>Publications</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredResearchers.map(researcher => (
                <tr key={researcher.id}>
                  <td>
                    {editingResearcher?.id === researcher.id ? (
                      <input
                        value={editingResearcher.name}
                        onChange={(e) => setEditingResearcher({
                          ...editingResearcher,
                          name: e.target.value
                        })}
                      />
                    ) : researcher.name}
                  </td>
                  <td>
                    {editingResearcher?.id === researcher.id ? (
                      <input
                        value={editingResearcher.email}
                        onChange={(e) => setEditingResearcher({
                          ...editingResearcher,
                          email: e.target.value
                        })}
                      />
                    ) : researcher.email}
                  </td>
                  <td>
                    {editingResearcher?.id === researcher.id ? (
                      <input
                        value={editingResearcher.specialization}
                        onChange={(e) => setEditingResearcher({
                          ...editingResearcher,
                          specialization: e.target.value
                        })}
                      />
                    ) : researcher.specialization}
                  </td>
                  <td>
                    {editingResearcher?.id === researcher.id ? (
                      <input
                        value={editingResearcher.domains.join(', ')}
                        onChange={(e) => setEditingResearcher({
                          ...editingResearcher,
                          domains: e.target.value.split(',').map(d => d.trim())
                        })}
                      />
                    ) : researcher.domains.join(', ')}
                  </td>
                  <td>{researcher.publications}</td>
                  <td className="actions">
                    {editingResearcher?.id === researcher.id ? (
                      <>
                        <button className="save-button" onClick={handleSave}>
                          <FiSave />
                        </button>
                        <button className="cancel-button" onClick={() => setEditingResearcher(null)}>
                          <FiX />
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="edit-button" onClick={() => handleEdit(researcher)}>
                          <FiEdit2 />
                        </button>
                        <button className="delete-button" onClick={() => handleDelete(researcher.id)}>
                          <FiTrash2 />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Researcher</h2>
            <button className="close-button" onClick={() => setShowAddForm(false)}>
              <FiX />
            </button>
            <form onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={newResearcher.name}
                  onChange={(e) => setNewResearcher({...newResearcher, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={newResearcher.email}
                  onChange={(e) => setNewResearcher({...newResearcher, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Specialization</label>
                <input
                  type="text"
                  value={newResearcher.specialization}
                  onChange={(e) => setNewResearcher({...newResearcher, specialization: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Domains (comma-separated)</label>
                <input
                  type="text"
                  value={newResearcher.domains.join(', ')}
                  onChange={(e) => setNewResearcher({...newResearcher, domains: e.target.value.split(',').map(d => d.trim())})}
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                <FiSave /> Save Researcher
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResearcherManagement;