import React, { useState } from 'react';
import { FiSearch, FiEdit2, FiTrash2, FiPlus, FiSave, FiX, FiFilter } from 'react-icons/fi';

function PublicationManagement() {
  const [publications, setPublications] = useState([
    {
      id: 1,
      title: "Advances in Natural Language Processing",
      authors: ["Dr. Sophie Martin", "Prof. Thomas Bernard"],
      domain: "NLP",
      year: 2025,
      citations: 45,
      abstract: "Latest research in NLP focusing on contextual understanding"
    },
    {
      id: 2,
      title: "Machine Learning in Cybersecurity",
      authors: ["Dr. Julie Dubois"],
      domain: "Cybersecurity",
      year: 2025,
      citations: 32,
      abstract: "Novel approaches to cybersecurity using ML"
    }
  ]);

  const [domains] = useState([
    "NLP", "AI", "Cybersecurity", "Machine Learning", "Image Processing"
  ]);

  const [researchers] = useState([
    "Dr. Sophie Martin", "Prof. Thomas Bernard", "Dr. Julie Dubois"
  ]);

  const [editingPublication, setEditingPublication] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPublication, setNewPublication] = useState({
    title: '',
    authors: [],
    domain: '',
    year: new Date().getFullYear(),
    citations: 0,
    abstract: ''
  });

  const handleEdit = (publication) => {
    setEditingPublication({ ...publication });
  };

  const handleSave = () => {
    if (editingPublication) {
      setPublications(publications.map(p => 
        p.id === editingPublication.id ? editingPublication : p
      ));
      setEditingPublication(null);
    }
  };

  const handleDelete = (id) => {
    setPublications(publications.filter(p => p.id !== id));
  };

  const handleAdd = () => {
    const id = Math.max(...publications.map(p => p.id)) + 1;
    setPublications([...publications, { ...newPublication, id }]);
    setNewPublication({
      title: '',
      authors: [],
      domain: '',
      year: new Date().getFullYear(),
      citations: 0,
      abstract: ''
    });
    setShowAddForm(false);
  };

  const filteredPublications = publications.filter(pub =>
    (selectedDomain === 'all' || pub.domain === selectedDomain) &&
    (pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     pub.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className="publication-management">
      <div className="management-header">
        <div className="filters-container">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search publications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="domain-filter">
            <FiFilter className="filter-icon" />
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
            >
              <option value="all">All Domains</option>
              {domains.map(domain => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>
          </div>
        </div>
        <button className="add-button" onClick={() => setShowAddForm(true)}>
          <FiPlus /> Add Publication
        </button>
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Publication</h2>
            <button className="close-button" onClick={() => setShowAddForm(false)}>
              <FiX />
            </button>
            <form onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={newPublication.title}
                  onChange={(e) => setNewPublication({...newPublication, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Authors</label>
                <div className="authors-select">
                  {researchers.map(researcher => (
                    <label key={researcher} className="author-checkbox">
                      <input
                        type="checkbox"
                        checked={newPublication.authors.includes(researcher)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewPublication({
                              ...newPublication,
                              authors: [...newPublication.authors, researcher]
                            });
                          } else {
                            setNewPublication({
                              ...newPublication,
                              authors: newPublication.authors.filter(a => a !== researcher)
                            });
                          }
                        }}
                      />
                      {researcher}
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Domain</label>
                <select
                  value={newPublication.domain}
                  onChange={(e) => setNewPublication({...newPublication, domain: e.target.value})}
                  required
                >
                  <option value="">Select Domain</option>
                  {domains.map(domain => (
                    <option key={domain} value={domain}>{domain}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Year</label>
                <input
                  type="number"
                  value={newPublication.year}
                  onChange={(e) => setNewPublication({...newPublication, year: parseInt(e.target.value)})}
                  min="1900"
                  max={new Date().getFullYear()}
                  required
                />
              </div>
              <div className="form-group">
                <label>Abstract</label>
                <textarea
                  value={newPublication.abstract}
                  onChange={(e) => setNewPublication({...newPublication, abstract: e.target.value})}
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                <FiSave /> Save Publication
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Authors</th>
              <th>Domain</th>
              <th>Year</th>
              <th>Citations</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPublications.map(publication => (
              <tr key={publication.id}>
                <td>
                  {editingPublication?.id === publication.id ? (
                    <input
                      value={editingPublication.title}
                      onChange={(e) => setEditingPublication({
                        ...editingPublication,
                        title: e.target.value
                      })}
                    />
                  ) : publication.title}
                </td>
                <td>
                  {editingPublication?.id === publication.id ? (
                    <select
                      multiple
                      value={editingPublication.authors}
                      onChange={(e) => setEditingPublication({
                        ...editingPublication,
                        authors: Array.from(e.target.selectedOptions, option => option.value)
                      })}
                    >
                      {researchers.map(researcher => (
                        <option key={researcher} value={researcher}>
                          {researcher}
                        </option>
                      ))}
                    </select>
                  ) : publication.authors.join(', ')}
                </td>
                <td>
                  {editingPublication?.id === publication.id ? (
                    <select
                      value={editingPublication.domain}
                      onChange={(e) => setEditingPublication({
                        ...editingPublication,
                        domain: e.target.value
                      })}
                    >
                      {domains.map(domain => (
                        <option key={domain} value={domain}>{domain}</option>
                      ))}
                    </select>
                  ) : publication.domain}
                </td>
                <td>
                  {editingPublication?.id === publication.id ? (
                    <input
                      type="number"
                      value={editingPublication.year}
                      onChange={(e) => setEditingPublication({
                        ...editingPublication,
                        year: parseInt(e.target.value)
                      })}
                      min="1900"
                      max={new Date().getFullYear()}
                    />
                  ) : publication.year}
                </td>
                <td>{publication.citations}</td>
                <td className="actions">
                  {editingPublication?.id === publication.id ? (
                    <>
                      <button className="save-button" onClick={handleSave}>
                        <FiSave />
                      </button>
                      <button className="cancel-button" onClick={() => setEditingPublication(null)}>
                        <FiX />
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="edit-button" onClick={() => handleEdit(publication)}>
                        <FiEdit2 />
                      </button>
                      <button className="delete-button" onClick={() => handleDelete(publication.id)}>
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

export default PublicationManagement;