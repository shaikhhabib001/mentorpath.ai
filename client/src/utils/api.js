import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('mentorpath_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('mentorpath_token');
      window.location.href = '/';
    } else if (error.response?.status === 413) {
      // File too large
      throw new Error('File size exceeds maximum limit (50MB)');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please try again.');
    } else if (!error.response) {
      throw new Error('Network error. Please check your connection.');
    }
    
    // Use server error message or default
    const message = error.response?.data?.message || 'An unexpected error occurred';
    throw new Error(message);
  }
);

// CV API endpoints
export const cvAPI = {
  upload: async (formData) => {
    const response = await api.post('/cv/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 60000, // Longer timeout for file uploads
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        // This can be used for progress indicators
        console.log(`Upload Progress: ${percentCompleted}%`);
      }
    });
    return response.data;
  },
  
  getAnalysis: async (cvId) => {
    const response = await api.get(`/cv/${cvId}`);
    return response.data;
  },
  
  getUserCVs: async () => {
    const response = await api.get('/cv');
    return response.data;
  }
};

// Chat API endpoints
export const chatAPI = {
  sendMessage: async (message, sessionId = null, context = {}) => {
    const response = await api.post('/chat/message', {
      message,
      sessionId,
      context
    });
    return response.data;
  },
  
  getSession: async (sessionId) => {
    const response = await api.get(`/chat/sessions/${sessionId}`);
    return response.data;
  },
  
  getUserSessions: async (limit = 10, page = 1) => {
    const response = await api.get('/chat/sessions', {
      params: { limit, page }
    });
    return response.data;
  },
  
  generateQuestions: async (role, level = 'mid', count = 5) => {
    const response = await api.post('/chat/questions/generate', {
      role, level, count
    });
    return response.data;
  }
};

// Jobs API endpoints
export const jobsAPI = {
  getAll: async (filters = {}) => {
    const response = await api.get('/jobs', { params: filters });
    return response.data;
  },
  
  getRecommended: async () => {
    const response = await api.get('/jobs/recommended');
    return response.data;
  },
  
  getJob: async (jobId) => {
    const response = await api.get(`/jobs/${jobId}`);
    return response.data;
  },
  
  getStats: async () => {
    const response = await api.get('/jobs/stats');
    return response.data;
  }
};

// Auth API endpoints
// export const authAPI = {
//   register: async (userData) => {
//     const response = await api.post('/auth/register', userData);
//     return response.data;
//   },
  
//   login: async (credentials) => {
//     const response = await api.post('/auth/login', credentials);
//     return response.data;
//   },
  
//   getProfile: async () => {
//     const response = await api.get('/auth/me');
//     return response.data;
//   },
  
//   updateProfile: async (profileData) => {
//     const response = await api.put('/auth/profile', profileData);
//     return response.data;
//   }
// };

// Health check
export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw new Error('Backend service is unavailable');
  }
};

export default api;