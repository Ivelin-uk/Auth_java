import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import adminService from '../../services/adminService';
import { toast } from 'react-toastify';
import './EditUser.css';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: 'USER',
    enabled: true
  });
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const user = await adminService.getUserById(id);
      setFormData({
        username: user.username,
        email: user.email,
        role: user.role,
        enabled: user.enabled
      });
    } catch (error) {
      toast.error('Грешка при зареждане на потребител');
      navigate('/admin/users');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await adminService.updateUser(id, formData);
      toast.success('Потребителят е обновен успешно!');
      navigate('/admin/users');
    } catch (error) {
      toast.error('Грешка при обновяване на потребител');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    
    if (newPassword.length < 8) {
      toast.error('Паролата трябва да е поне 8 символа');
      return;
    }

    try {
      await adminService.resetPassword(id, newPassword);
      toast.success('Паролата е обновена успешно!');
      setNewPassword('');
      setShowPasswordReset(false);
    } catch (error) {
      toast.error('Грешка при обновяване на парола');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Зареждане...</p>
      </div>
    );
  }

  return (
    <div className="edit-user-container">
      <div className="edit-user-card">
        <h2>✏️ Редактиране на потребител</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Потребителско име</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              minLength="3"
              maxLength="50"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Роля</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-select"
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          <div className="form-group-checkbox">
            <input
              type="checkbox"
              id="enabled"
              name="enabled"
              checked={formData.enabled}
              onChange={handleChange}
            />
            <label htmlFor="enabled">Активен акаунт</label>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Запазване...' : '💾 Запази промените'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/admin/users')}
            >
              Отказ
            </button>
          </div>
        </form>

        <div className="password-reset-section">
          <button
            className="btn btn-warning"
            onClick={() => setShowPasswordReset(!showPasswordReset)}
          >
            🔑 {showPasswordReset ? 'Скрий' : 'Ресетни парола'}
          </button>

          {showPasswordReset && (
            <form onSubmit={handlePasswordReset} className="password-form">
              <div className="form-group">
                <label htmlFor="newPassword">Нова парола</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Минимум 8 символа"
                  minLength="8"
                  required
                />
                <small>
                  Паролата трябва да съдържа: 8+ символа, главна и малка буква, цифра и специален символ
                </small>
              </div>
              <button type="submit" className="btn btn-primary">
                Обнови парола
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditUser;
