import React, { useState } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';

function PublicationManagement() {
  const [publications] = useState([
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

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');

  const filteredPublications = publications.filter(pub =>
    (selectedDomain === 'all' || pub.domain === selectedDomain) &&
    (pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     pub.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className="management-component">
      <div className="management-header">
        <h1 className="page-title">Publications Overview</h1>
        <div className="header-actions">
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
              <option value="all">All Research Areas</option>
              {domains.map(domain => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="table-wrapper">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Authors</th>
                <th>Research Area</th>
                <th>Year</th>
                <th>Citations</th>
              </tr>
            </thead>
            <tbody>
              {filteredPublications.map(publication => (
                <tr key={publication.id}>
                  <td>{publication.title}</td>
                  <td>{publication.authors.join(', ')}</td>
                  <td>
                    <span className="domain-badge">
                      {publication.domain}
                    </span>
                  </td>
                  <td>{publication.year}</td>
                  <td>{publication.citations}</td>
                </tr>
              ))}
              {filteredPublications.length === 0 && (
                <tr>
                  <td colSpan="5" className="no-results">
                    No publications found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PublicationManagement;