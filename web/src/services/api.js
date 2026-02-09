import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Your Node.js server URL
});

export const getHealthStatus = () => API.get('/status');
export const getUserData = (id) => API.get(`/users/${id}`);

export default API;