import React, { useState } from 'react';
import { FiSearch, FiTrash2, FiUserPlus, FiSave, FiX, FiCheckCircle, FiXCircle } from 'react-icons/fi';

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

  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'researcher',
    status: 'pending'
  });

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

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="user-account-management">
      <div className="management-header">
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
  );
}

export default UserAccountManagement;