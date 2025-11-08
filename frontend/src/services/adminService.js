import axios from 'axios';
import authService from './authService';

const ADMIN_API_URL = 'http://localhost:8082/api/admin';

const adminService = {
  getAllUsers: async () => {
    const response = await axios.get(`${ADMIN_API_URL}/users`, {
      headers: authService.authHeader()
    });
    return response.data;
  },

  getUserById: async (id) => {
    const response = await axios.get(`${ADMIN_API_URL}/users/${id}`, {
      headers: authService.authHeader()
    });
    return response.data;
  },

  updateUser: async (id, userData) => {
    const response = await axios.put(`${ADMIN_API_URL}/users/${id}`, userData, {
      headers: authService.authHeader()
    });
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await axios.delete(`${ADMIN_API_URL}/users/${id}`, {
      headers: authService.authHeader()
    });
    return response.data;
  },

  activateUser: async (id) => {
    const response = await axios.post(`${ADMIN_API_URL}/users/${id}/activate`, {}, {
      headers: authService.authHeader()
    });
    return response.data;
  },

  deactivateUser: async (id) => {
    const response = await axios.post(`${ADMIN_API_URL}/users/${id}/deactivate`, {}, {
      headers: authService.authHeader()
    });
    return response.data;
  },

  resetPassword: async (id, newPassword) => {
    const response = await axios.post(
      `${ADMIN_API_URL}/users/${id}/reset-password`,
      { newPassword },
      {
        headers: authService.authHeader()
      }
    );
    return response.data;
  }
};

export default adminService;
