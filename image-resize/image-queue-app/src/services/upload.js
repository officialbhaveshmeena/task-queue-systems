// src/services/upload.js

import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
const token = localStorage.getItem("auth_token"); 
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,   // 🔥 JWT added here
  },
});

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await axiosInstance.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return res.data;
};

export const fetchImages = async () => {
  const res = await axiosInstance.post('/upload/all'); // Changed to GET request
  return res.data;
};