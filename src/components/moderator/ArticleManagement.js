import React, { useState, useRef } from 'react';
import { FiSearch, FiEdit2, FiTrash2, FiPlus, FiSave, FiX, FiUpload, FiFile } from 'react-icons/fi';

// Demo articles data (replace with actual API calls in production)
const demoArticles = [
  {
    id: 1,
    title: "Advances in Natural Language Processing",
    category: "NLP",
    excerpt: "Latest innovations in NLP enabling better context understanding...",
    author: "Dr. Sophie Martin",
    date: "2025-03-15",
    status: "published",
    fileUrl: "/path/to/file.pdf",
    fileType: "pdf"
  },
  {
    id: 2,
    title: "Machine Learning in Healthcare",
    category: "AI",
    excerpt: "Applications of ML in medical diagnosis and treatment...",
    author: "Prof. Thomas Bernard",
    date: "2025-03-20",
    status: "draft",
    fileUrl: "/path/to/file.docx",
    fileType: "docx"
  }
];

function ArticleManagement({ isAdding = false }) {
  const [articles, setArticles] = useState(demoArticles);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(isAdding);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [newArticle, setNewArticle] = useState({
    title: '',
    category: '',
    excerpt: '',
    author: '',
    status: 'draft',
    fileUrl: '',
    fileType: ''
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setArticles(articles.filter(article => article.id !== id));
    }
  };

  const handleEdit = (article) => {
    setSelectedArticle(article);
    setNewArticle(article);
    setShowAddForm(true);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      const fileType = file.name.split('.').pop().toLowerCase();
      if (!['pdf', 'doc', 'docx'].includes(fileType)) {
        alert('Please upload a PDF or Word document');
        return;
      }
      
      setSelectedFile(file);
      setNewArticle({
        ...newArticle,
        fileUrl: URL.createObjectURL(file),
        fileType: fileType
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile && !selectedArticle?.fileUrl) {
      alert('Please upload an article file');
      return;
    }

    if (selectedArticle) {
      // Update existing article
      setArticles(articles.map(article => 
        article.id === selectedArticle.id 
          ? { ...newArticle, id: article.id }
          : article
      ));
    } else {
      // Add new article
      const id = Math.max(...articles.map(a => a.id)) + 1;
      const today = new Date().toISOString().split('T')[0];
      setArticles([...articles, { ...newArticle, id, date: today }]);
    }
    setShowAddForm(false);
    setSelectedArticle(null);
    setSelectedFile(null);
    setNewArticle({
      title: '',
      category: '',
      excerpt: '',
      author: '',
      status: 'draft',
      fileUrl: '',
      fileType: ''
    });
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="management-component">
      <div className="management-header">
        <h1 className="page-title">Article Management</h1>
        <div className="header-actions">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {!showAddForm && (
            <button className="add-button" onClick={() => setShowAddForm(true)}>
              <FiPlus /> Add Article
            </button>
          )}
        </div>
      </div>

      {showAddForm ? (
        <div className="form-container">
          <h2>{selectedArticle ? 'Edit Article' : 'Add New Article'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={newArticle.title}
                onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                value={newArticle.category}
                onChange={(e) => setNewArticle({...newArticle, category: e.target.value})}
                required
              >
                <option value="">Select category</option>
                <option value="NLP">Natural Language Processing</option>
                <option value="AI">Artificial Intelligence</option>
                <option value="ML">Machine Learning</option>
                <option value="Security">Cybersecurity</option>
              </select>
            </div>

            <div className="form-group">
              <label>Excerpt</label>
              <textarea
                value={newArticle.excerpt}
                onChange={(e) => setNewArticle({...newArticle, excerpt: e.target.value})}
                required
                rows={4}
              />
            </div>

            <div className="form-group">
              <label>Author</label>
              <input
                type="text"
                value={newArticle.author}
                onChange={(e) => setNewArticle({...newArticle, author: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Article File (PDF or Word)</label>
              <div className="file-upload">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  className="upload-button"
                  onClick={() => fileInputRef.current.click()}
                >
                  <FiUpload /> Choose File
                </button>
                {(selectedFile || newArticle.fileUrl) && (
                  <span className="file-info">
                    <FiFile /> {selectedFile ? selectedFile.name : newArticle.fileUrl.split('/').pop()}
                  </span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                value={newArticle.status}
                onChange={(e) => setNewArticle({...newArticle, status: e.target.value})}
                required
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-button">
                <FiSave /> {selectedArticle ? 'Update' : 'Save'} Article
              </button>
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => {
                  setShowAddForm(false);
                  setSelectedArticle(null);
                  setSelectedFile(null);
                  setNewArticle({
                    title: '',
                    category: '',
                    excerpt: '',
                    author: '',
                    status: 'draft',
                    fileUrl: '',
                    fileType: ''
                  });
                }}
              >
                <FiX /> Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Date</th>
                <th>Status</th>
                <th>File</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.map(article => (
                <tr key={article.id}>
                  <td>{article.title}</td>
                  <td>{article.category}</td>
                  <td>{article.author}</td>
                  <td>{article.date}</td>
                  <td>
                    <span className={`status-badge ${article.status}`}>
                      {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    {article.fileUrl && (
                      <a 
                        href={article.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="file-link"
                      >
                        <FiFile /> {article.fileType.toUpperCase()}
                      </a>
                    )}
                  </td>
                  <td className="actions">
                    <button
                      className="action-button edit-button"
                      onClick={() => handleEdit(article)}
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      className="action-button delete-button"
                      onClick={() => handleDelete(article.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ArticleManagement;