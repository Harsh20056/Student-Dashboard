import axios from 'axios';

// Single source of truth for API base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  withCredentials: true,
});

export default api;
