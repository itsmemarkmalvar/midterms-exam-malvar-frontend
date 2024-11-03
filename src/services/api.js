import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true
});

// Add request interceptor to fetch CSRF token before each request
api.interceptors.request.use(async config => {
  // Get CSRF cookie first
  await axios.get('http://localhost:8000/sanctum/csrf-cookie');
  
  // Get the XSRF token from cookie
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];

  if (token) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
  }
  
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    const errorMessage = error.response?.data?.error 
      || error.response?.data?.message 
      || 'An unexpected error occurred';
      
    // Handle validation errors
    if (error.response?.status === 422) {
      const validationErrors = error.response.data.errors;
      const formattedErrors = Object.keys(validationErrors).reduce((acc, key) => {
        acc[key] = validationErrors[key][0];
        return acc;
      }, {});
      
      error.validationErrors = formattedErrors;
    }
    
    error.userMessage = errorMessage;
    return Promise.reject(error);
  }
);

export const fetchBooks = () => api.get('/api/books');
export const getBook = (id) => api.get(`/api/books/${id}`);
export const createBook = (data) => api.post('/api/books', data);
export const updateBook = (id, data) => api.put(`/api/books/${id}`, data);
export const deleteBook = (id) => api.delete(`/api/books/${id}`);

export default api; 