import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import adminService from '../../services/adminService';
import { toast } from 'react-toastify';
import './UsersList.css';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Грешка при зареждане на потребители');
    } finally {
      setLoading(false);
    }
  };

  const handleActivate = async (id) => {
    try {
      await adminService.activateUser(id);
      toast.success('Потребителят е активиран');
      fetchUsers();
    } catch (error) {
      toast.error('Грешка при активиране');
    }
  };

  const handleDeactivate = async (id) => {
    try {
      await adminService.deactivateUser(id);
      toast.success('Потребителят е деактивиран');
      fetchUsers();
    } catch (error) {
      toast.error('Грешка при деактивиране');
    }
  };

  const handleDelete = async (id, username) => {
    if (window.confirm(`Сигурни ли сте, че искате да изтриете ${username}?`)) {
      try {
        await adminService.deleteUser(id);
        toast.success('Потребителят е изтрит');
        fetchUsers();
      } catch (error) {
        toast.error('Грешка при изтриване');
      }
    }
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Зареждане на потребители...</p>
      </div>
    );
  }

  return (
    <div className="users-container">
      <div className="users-header">
        <h1>👥 Управление на потребители</h1>
        <p>Общо: {users.length} потребители</p>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="🔍 Търси по име или email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Потребител</th>
              <th>Email</th>
              <th>Роля</th>
              <th>Статус</th>
              <th>Създаден</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td className="username-cell">
                  <strong>{user.username}</strong>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role.toLowerCase()}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${user.enabled ? 'active' : 'inactive'}`}>
                    {user.enabled ? '✓ Активен' : '✗ Неактивен'}
                  </span>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString('bg-BG')}</td>
                <td className="actions-cell">
                  <Link to={`/admin/users/${user.id}/edit`} className="btn-action btn-edit">
                    ✏️
                  </Link>
                  {user.enabled ? (
                    <button
                      onClick={() => handleDeactivate(user.id)}
                      className="btn-action btn-deactivate"
                      title="Деактивирай"
                    >
                      🚫
                    </button>
                  ) : (
                    <button
                      onClick={() => handleActivate(user.id)}
                      className="btn-action btn-activate"
                      title="Активирай"
                    >
                      ✓
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(user.id, user.username)}
                    className="btn-action btn-delete"
                    title="Изтрий"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="no-results">
            <p>Няма намерени потребители</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersList;
