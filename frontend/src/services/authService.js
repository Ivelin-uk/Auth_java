import axios from 'axios';

const AUTH_API_URL = 'http://localhost:8081/api/auth';

const authService = {
  register: async (username, email, password) => {
    const response = await axios.post(`${AUTH_API_URL}/register`, {
      username,
      email,
      password
    });
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({
        username: response.data.username,
        email: response.data.email,
        role: response.data.role
      }));
    }
    
    return response.data;
  },

  login: async (username, password) => {
    const response = await axios.post(`${AUTH_API_URL}/login`, {
      username,
      password
    });
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({
        username: response.data.username,
        email: response.data.email,
        role: response.data.role
      }));
    }
    
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  validateToken: async () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const response = await axios.post(`${AUTH_API_URL}/validate`, {
        token
      });
      return response.data.valid;
    } catch (error) {
      return false;
    }
  },

  authHeader: () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
};

export default authService;
