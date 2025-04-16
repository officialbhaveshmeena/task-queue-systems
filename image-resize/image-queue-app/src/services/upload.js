// src/services/upload.js

import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
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