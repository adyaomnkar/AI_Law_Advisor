import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

export const sendQuery = async (query, domain, language = 'en', sessionId = null) => {
  const { data } = await api.post('/api/chat', { query, domain, language, session_id: sessionId });
  return data;
};

export const generatePDF = async (templateType, entities, details) => {
  const { data } = await api.post('/api/generate-pdf', { template_type: templateType, entities, details }, { responseType: 'blob' });
  return data;
};

export const searchLegal = async (query, domain) => {
  const { data } = await api.post('/api/search', { query, domain });
  return data;
};

export const getLegalAidServices = async (state = '') => {
  const { data } = await api.get('/api/legal-aid', { params: { state } });
  return data;
};

export default api;
