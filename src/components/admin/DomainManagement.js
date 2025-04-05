import React, { useState } from 'react';
import { FiSearch, FiEdit2, FiTrash2, FiPlus, FiSave, FiX } from 'react-icons/fi';

function DomainManagement() {
  const [domains, setDomains] = useState([
    {
      id: 1,
      name: "Natural Language Processing",
      shortName: "NLP",
      description: "Research in processing and analyzing human language",
      publicationsCount: 45
    },
    {
      id: 2,
      name: "Artificial Intelligence",
      shortName: "AI",
      description: "General artificial intelligence research",
      publicationsCount: 78
    }
  ]);

  const [editingDomain, setEditingDomain] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDomain, setNewDomain] = useState({
    name: '',
    shortName: '',
    description: '',
    publicationsCount: 0
  });

  const handleEdit = (domain) => {
    setEditingDomain({ ...domain });
  };

  const handleSave = () => {
    if (editingDomain) {
      setDomains(domains.map(d => 
        d.id === editingDomain.id ? editingDomain : d
      ));
      setEditingDomain(null);
    }
  };

  const handleDelete = (id) => {
    setDomains(domains.filter(d => d.id !== id));
  };

  const handleAdd = () => {
    const id = Math.max(...domains.map(d => d.id)) + 1;
    setDomains([...domains, { ...newDomain, id }]);
    setNewDomain({
      name: '',
      shortName: '',
      description: '',
      publicationsCount: 0
    });
    setShowAddForm(false);
  };

  const filteredDomains = domains.filter(domain =>
    domain.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    domain.shortName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="domain-management">
      <div className="management-header">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search domains..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="add-button" onClick={() => setShowAddForm(true)}>
          <FiPlus /> Add Domain
        </button>
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Research Domain</h2>
            <button className="close-button" onClick={() => setShowAddForm(false)}>
              <FiX />
            </button>
            <form onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>
              <div className="form-group">
                <label>Domain Name</label>
                <input
                  type="text"
                  value={newDomain.name}
                  onChange={(e) => setNewDomain({...newDomain, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Short Name</label>
                <input
                  type="text"
                  value={newDomain.shortName}
                  onChange={(e) => setNewDomain({...newDomain, shortName: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newDomain.description}
                  onChange={(e) => setNewDomain({...newDomain, description: e.target.value})}
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                <FiSave /> Save Domain
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Short Name</th>
              <th>Description</th>
              <th>Publications</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDomains.map(domain => (
              <tr key={domain.id}>
                <td>
                  {editingDomain?.id === domain.id ? (
                    <input
                      value={editingDomain.name}
                      onChange={(e) => setEditingDomain({
                        ...editingDomain,
                        name: e.target.value
                      })}
                    />
                  ) : domain.name}
                </td>
                <td>
                  {editingDomain?.id === domain.id ? (
                    <input
                      value={editingDomain.shortName}
                      onChange={(e) => setEditingDomain({
                        ...editingDomain,
                        shortName: e.target.value
                      })}
                    />
                  ) : domain.shortName}
                </td>
                <td>
                  {editingDomain?.id === domain.id ? (
                    <textarea
                      value={editingDomain.description}
                      onChange={(e) => setEditingDomain({
                        ...editingDomain,
                        description: e.target.value
                      })}
                    />
                  ) : domain.description}
                </td>
                <td>{domain.publicationsCount}</td>
                <td className="actions">
                  {editingDomain?.id === domain.id ? (
                    <>
                      <button className="save-button" onClick={handleSave}>
                        <FiSave />
                      </button>
                      <button className="cancel-button" onClick={() => setEditingDomain(null)}>
                        <FiX />
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="edit-button" onClick={() => handleEdit(domain)}>
                        <FiEdit2 />
                      </button>
                      <button className="delete-button" onClick={() => handleDelete(domain.id)}>
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
  );
}

export default DomainManagement;