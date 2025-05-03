import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL; // Update this with your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API
export const authApi = {
  login: (data: { email: string; password: string }) => 
    api.post('/auth/login', data),
  register: (data: { email: string; password: string; name: string }) => 
    api.post('/auth/register', data),
};

// User API
export const userApi = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data: any) => api.put('/user/profile', data),
};

// Post API
export const postApi = {
  getAll: () => api.get('/posts'),
  getById: (id: string) => api.get(`/posts/${id}`),
  create: (data: any) => api.post('/posts', data),
  update: (id: string, data: any) => api.put(`/posts/${id}`, data),
  delete: (id: string) => api.delete(`/posts/${id}`),
  like: (id: string) => api.post(`/posts/${id}/like`),
  unlike: (id: string) => api.delete(`/posts/${id}/like`),
};

// Comment API
export const commentApi = {
  create: (postId: string, data: any) => api.post(`/posts/${postId}/comments`, data),
  update: (postId: string, commentId: string, data: any) => 
    api.put(`/posts/${postId}/comments/${commentId}`, data),
  delete: (postId: string, commentId: string) => 
    api.delete(`/posts/${postId}/comments/${commentId}`),
};

// Layanan (Service) API
export const layananApi = {
  getAll: () => api.get('/layanan'),
  getById: (id: number) => api.get(`/layanan/${id}`),
  create: (data: any) => api.post('/layanan', data),
  update: (id: number, data: any) => api.patch(`/layanan/${id}`, data),
  delete: (id: number) => api.delete(`/layanan/${id}`),
};

// Pegawai (Employee) API
export const pegawaiApi = {
  getAll: () => api.get('/pegawai'),
  getById: (id: number) => api.get(`/pegawai/${id}`),
  create: (data: any) => api.post('/pegawai', data),
  update: (id: number, data: any) => api.patch(`/pegawai/${id}`, data),
  delete: (id: number) => api.delete(`/pegawai/${id}`),
};

// Pembeli (Customer) API
export const pembeliApi = {
  getAll: () => api.get('/pembeli'),
  getById: (id: number) => api.get(`/pembeli/${id}`),
  create: (data: any) => api.post('/pembeli', data),
  update: (id: number, data: any) => api.patch(`/pembeli/${id}`, data),
  delete: (id: number) => api.delete(`/pembeli/${id}`),
};

// Product API
export const productApi = {
  getAll: () => api.get('/products'),
  getById: (id: string) => api.get(`/products/${id}`),
  create: (data: any) => api.post('/products', data),
  update: (id: string, data: any) => api.put(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
};

// Cart API
export const cartApi = {
  getCart: () => api.get('/carts'),
  addToCart: (data: { productId: string; quantity: number }) => 
    api.post('/carts', data),
  updateCartItem: (id: string, data: { quantity: number }) => 
    api.put(`/carts/${id}`, data),
  removeFromCart: (id: string) => api.delete(`/carts/${id}`),
};

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api; 