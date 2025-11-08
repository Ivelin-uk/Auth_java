import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const navigate = useNavigate();
  const { register } = useAuth();

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push('Паролата трябва да е поне 8 символа');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Трябва да съдържа поне една главна буква');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Трябва да съдържа поне една малка буква');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Трябва да съдържа поне една цифра');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Трябва да съдържа поне един специален символ');
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'password') {
      setPasswordErrors(validatePassword(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Паролите не съвпадат');
      return;
    }

    const errors = validatePassword(formData.password);
    if (errors.length > 0) {
      toast.error('Паролата не отговаря на изискванията');
      return;
    }

    setLoading(true);

    try {
      await register(formData.username, formData.email, formData.password);
      toast.success('Успешна регистрация!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Грешка при регистрация');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>📝 Регистрация</h2>
        <p className="auth-subtitle">Създайте нов акаунт</p>
        
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
              placeholder="Минимум 3 символа"
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
              placeholder="example@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Парола</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Сигурна парола"
            />
            {passwordErrors.length > 0 && (
              <div className="password-requirements">
                <p>Изисквания за парола:</p>
                <ul>
                  {passwordErrors.map((error, index) => (
                    <li key={index} className="error">❌ {error}</li>
                  ))}
                </ul>
              </div>
            )}
            {formData.password && passwordErrors.length === 0 && (
              <div className="password-success">
                ✅ Паролата отговаря на всички изисквания
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Потвърдете парола</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Въведете паролата отново"
            />
          </div>

          <button type="submit" className="btn-submit" disabled={loading || passwordErrors.length > 0}>
            {loading ? 'Регистрация...' : 'Регистрирай се'}
          </button>
        </form>

        <p className="auth-footer">
          Вече имате акаунт? <Link to="/login">Влезте тук</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
