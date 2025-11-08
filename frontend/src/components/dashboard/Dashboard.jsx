import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>🎉 Добре дошли, {user?.username}!</h1>
        <p className="subtitle">Вашият личен dashboard</p>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="card-icon">👤</div>
          <h3>Профил</h3>
          <p><strong>Потребител:</strong> {user?.username}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">🔒</div>
          <h3>Сигурност</h3>
          <p>Акаунтът ви е защитен с JWT токен</p>
          <p>Токенът е валиден 24 часа</p>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">⚙️</div>
          <h3>Настройки</h3>
          <p>Управлявайте вашия профил</p>
          <p>Променете настройките си</p>
        </div>
      </div>

      <div className="dashboard-info">
        <h2>ℹ️ Информация</h2>
        <div className="info-box">
          <p>
            Това е защитена страница. Можете да я видите само ако сте влезли в системата.
          </p>
          <p>
            За админ функционалности, посетете секцията <strong>Users</strong> в навигацията.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
