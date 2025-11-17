import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const signup = async (data) => {
  const res = axiosInstance.post(`${API_BASE_URL}/signup`, data);

  const resData = await res.json();

    //   if (!res.ok) {
    //     setError(resData.message || "Signup failed");
    //     return;
    //   }

      // After successful signup → redirect to login
    //   navigate("/login");
};

export const login = async (data) => {
  return axiosInstance.post(`${API_BASE_URL}/login`, data);
};
