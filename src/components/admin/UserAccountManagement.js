import React, { useState } from 'react';
import { FiSearch, FiTrash2, FiUserPlus, FiSave, FiX, FiCheckCircle, FiXCircle, FiCheck, FiUserCheck } from 'react-icons/fi';

function UserAccountManagement() {
  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: "Sophie",
      lastName: "Martin",
      email: "sophie.martin@univ-paris.fr",
      role: "researcher",
      status: "active",
      joinDate: "2025-01-15"
    },
    {
      id: 2,
      firstName: "Thomas",
      lastName: "Bernard",
      email: "t.bernard@polytechnique.fr",
      role: "researcher",
      status: "pending",
      joinDate: "2025-02-20"
    }
  ]);

  const [moderatorRequests, setModeratorRequests] = useState([
    {
      id: 1,
      userId: 2,
      firstName: "Thomas",
      lastName: "Bernard",
      email: "t.bernard@polytechnique.fr",
      motivation: "I would like to contribute to the research community...",
      experience: "5 years of research experience in AI...",
      specialization: "Artificial Intelligence",
      publications: "Published 10 papers in top conferences...",
      status: "pending",
      submitDate: "2025-03-15"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'researcher',
    status: 'pending'
  });
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user account?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleAdd = () => {
    const id = Math.max(...users.map(u => u.id)) + 1;
    const today = new Date().toISOString().split('T')[0];
    setUsers([...users, { ...newUser, id, joinDate: today }]);
    setNewUser({
      firstName: '',
      lastName: '',
      email: '',
      role: 'researcher',
      status: 'pending'
    });
    setShowAddForm(false);
  };

  const toggleStatus = (id) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        return {
          ...user,
          status: user.status === 'active' ? 'inactive' : 'active'
        };
      }
      return user;
    }));
  };

  const handleModeratorRequest = (requestId, approved) => {
    const request = moderatorRequests.find(req => req.id === requestId);
    if (!request) return;

    if (approved) {
      setUsers(users.map(user => {
        if (user.id === request.userId) {
          return { ...user, role: 'moderator' };
        }
        return user;
      }));
    }

    setModeratorRequests(moderatorRequests.filter(req => req.id !== requestId));
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="management-component">
      <div className="management-header">
        <h1 className="page-title">User Accounts</h1>
        <div className="header-actions">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="add-button" onClick={() => setShowAddForm(true)}>
            <FiUserPlus /> Add User
          </button>
        </div>
      </div>

      {moderatorRequests.length > 0 && (
        <div className="section-container">
          <h2 className="section-title">Moderator Requests</h2>
          <div className="table-wrapper">
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Specialization</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {moderatorRequests.map(request => (
                    <tr key={request.id}>
                      <td>{`${request.firstName} ${request.lastName}`}</td>
                      <td>{request.email}</td>
                      <td>{request.specialization}</td>
                      <td className="actions">
                        <button 
                          className="view-details-button"
                          onClick={() => handleViewDetails(request)}
                        >
                          View Details
                        </button>
                        <button 
                          className="approve-button"
                          onClick={() => handleModeratorRequest(request.id, true)}
                        >
                          <FiCheck /> Approve
                        </button>
                        <button 
                          className="reject-button"
                          onClick={() => handleModeratorRequest(request.id, false)}
                        >
                          <FiX /> Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedRequest && (
        <div className="modal-overlay">
          <div className="modal-content details-modal">
            <h2>Moderator Request Details</h2>
            <button 
              className="close-button"
              onClick={() => {
                setShowDetailsModal(false);
                setSelectedRequest(null);
              }}
            >
              <FiX />
            </button>

            <div className="details-content">
              <div className="detail-group">
                <h3>Personal Information</h3>
                <p><strong>Name:</strong> {`${selectedRequest.firstName} ${selectedRequest.lastName}`}</p>
                <p><strong>Email:</strong> {selectedRequest.email}</p>
                <p><strong>Specialization:</strong> {selectedRequest.specialization}</p>
              </div>

              <div className="detail-group">
                <h3>Motivation</h3>
                <p>{selectedRequest.motivation}</p>
              </div>

              <div className="detail-group">
                <h3>Research Experience</h3>
                <p>{selectedRequest.experience}</p>
              </div>

              <div className="detail-group">
                <h3>Publications and Contributions</h3>
                <p>{selectedRequest.publications}</p>
              </div>

              <div className="details-actions">
                <button 
                  className="approve-button"
                  onClick={() => {
                    handleModeratorRequest(selectedRequest.id, true);
                    setShowDetailsModal(false);
                  }}
                >
                  <FiCheck /> Approve Request
                </button>
                <button 
                  className="reject-button"
                  onClick={() => {
                    handleModeratorRequest(selectedRequest.id, false);
                    setShowDetailsModal(false);
                  }}
                >
                  <FiX /> Reject Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="section-container">
        <h2 className="section-title">All Users</h2>
        <div className="table-wrapper">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Join Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td>{`${user.firstName} ${user.lastName}`}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge ${user.role}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td>
                      <button
                        className={`status-toggle ${user.status}`}
                        onClick={() => toggleStatus(user.id)}
                      >
                        {user.status === 'active' ? (
                          <><FiCheckCircle /> Active</>
                        ) : (
                          <><FiXCircle /> Inactive</>
                        )}
                      </button>
                    </td>
                    <td>{user.joinDate}</td>
                    <td className="actions">
                      <button className="delete-button" onClick={() => handleDelete(user.id)}>
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New User</h2>
            <button className="close-button" onClick={() => setShowAddForm(false)}>
              <FiX />
            </button>
            <form onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  value={newUser.firstName}
                  onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  value={newUser.lastName}
                  onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  required
                >
                  <option value="researcher">Researcher</option>
                  <option value="admin">Administrator</option>
                  <option value="moderator">Moderator</option>
                </select>
              </div>
              <button type="submit" className="submit-button">
                <FiSave /> Create User
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserAccountManagement;