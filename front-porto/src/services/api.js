// src/services/api.js
import axios from 'axios';

// Use the correct port 3005
const API_BASE_URL = 'http://localhost:3005/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Simple configuration without interceptors for now
export const experiencesAPI = {
  getAll: () => api.get('/experiences'),
  create: (experienceData) => api.post('/experiences', experienceData),
  update: (id, experienceData) => api.put(`/experiences/${id}`, experienceData),
  delete: (id) => api.delete(`/experiences/${id}`),
};

export const projectsAPI = {
  getAll: () => api.get('/projects'),
  getById: (id) => api.get(`/projects/${id}`),
  create: (projectData) => api.post('/projects', projectData),
  update: (id, projectData) => api.put(`/projects/${id}`, projectData),
  delete: (id) => api.delete(`/projects/${id}`),
};

export const skillsAPI = {  
  getAll: () => api.get('/skills'),
  getById: (id) => api.get(`/skills/${id}`),
  create: (skillData) => api.post('/skills', skillData),
  update: (id, skillData) => api.put(`/skills/${id}`, skillData),
  delete: (id) => api.delete(`/skills/${id}`),
};

export default api;