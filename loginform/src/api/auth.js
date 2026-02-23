import axios from "axios";

const API = "http://localhost:8000";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ─── Auth ──────────────────────────────────────────────────────────────────────

export const signupUser = (data) =>
  axios.post(`${API}/signup`, data).then((r) => r.data);

export const loginUser = (data) =>
  axios.post(`${API}/login`, data).then((r) => r.data);

export const getMe = (token) =>
  axios.get(`${API}/me`, { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.data);

// ─── Tasks ─────────────────────────────────────────────────────────────────────

export const getTasks = () =>
  axios.get(`${API}/tasks`, { headers: authHeader() }).then((r) => r.data);

export const createTask = (data) =>
  axios.post(`${API}/tasks`, data, { headers: authHeader() }).then((r) => r.data);

export const updateTask = (id, data) =>
  axios.put(`${API}/tasks/${id}`, data, { headers: authHeader() }).then((r) => r.data);

export const deleteTask = (id) =>
  axios.delete(`${API}/tasks/${id}`, { headers: authHeader() });

// ─── Password Reset ────────────────────────────────────────────────────────────

export const forgotPassword = (email) =>
  axios.post(`${API}/forgot-password`, { email }).then((r) => r.data);

export const resetPassword = (data) =>
  axios.post(`${API}/reset-password`, data).then((r) => r.data);
