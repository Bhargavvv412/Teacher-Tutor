import axios from "axios";

const API_URL = "http://localhost:5050/auth";

// Signup
export const signup = async (username, password) => {
  const res = await axios.post(`${API_URL}/signup`, { username, password });
  return res.data;
};

// Login
export const login = async (username, password) => {
  const res = await axios.post(`${API_URL}/login`, { username, password });
  return res.data;
};

// Get user profile
export const getMe = async (token) => {
  const res = await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
