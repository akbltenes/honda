import axios from 'axios';

// API temel URL'si
const API_URL = 'http://localhost:8080/api';

// Request interceptor - Token'ı her isteğe ekler
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - 401 hatalarını yakalar
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token geçersiz olduğunda kullanıcıyı logout yapabilirsiniz
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth servisleri
const AuthService = {
  login: async (username, password) => {
    return axios.post(`${API_URL}/auth/login`, { username, password });
  },
  register: async (userData) => {
    return axios.post(`${API_URL}/auth/register`, userData);
  },
  getUserProfile: async () => {
    return axios.get(`${API_URL}/users/me`);
  }
};

// Post servisleri
const PostService = {
  getAllPosts: async () => {
    return axios.get(`${API_URL}/posts`);
  },
  getPostById: async (id) => {
    return axios.get(`${API_URL}/posts/${id}`);
  },
  createPost: async (postData) => {
    return axios.post(`${API_URL}/posts`, postData);
  },
  updatePost: async (id, postData) => {
    return axios.put(`${API_URL}/posts/${id}`, postData);
  },
  deletePost: async (id) => {
    return axios.delete(`${API_URL}/posts/${id}`);
  }
};

export {
  AuthService,
  PostService
};