import axios from 'axios';

const baseURL = 'http://localhost:8000';
const instance = axios.create({ baseURL });

// Menambahkan interceptor untuk setiap permintaan
instance.interceptors.request.use((config) => {
  // Mendapatkan token dari localStorage jika tersedia
  const token = localStorage.getItem('token');

  // Menambahkan token ke header Authorization jika tersedia
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Logika lainnya yang diperlukan dapat ditambahkan di sini

  return config;
});

export { instance };