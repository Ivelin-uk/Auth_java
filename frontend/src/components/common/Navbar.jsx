import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🔐 Auth System
        </Link>

        <div className="nav-menu">
          {isLoggedIn() ? (
            <>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <Link to="/admin/users" className="nav-link">
                👥 Users
              </Link>
              <div className="nav-user">
                <span>👤 {user?.username}</span>
                <button onClick={handleLogout} className="btn-logout">
                  Изход
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Вход
              </Link>
              <Link to="/register" className="nav-link btn-register">
                Регистрация
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
