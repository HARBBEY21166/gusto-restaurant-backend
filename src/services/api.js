const API_BASE_URL = 'https://stunning-space-palm-tree-6q75jjg645p25g6w-5000.app.github.dev/api';

// Helper function to get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const authAPI = {
  // Signup user
  signup: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    return response.json();
  },

  // Login user
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  },

  // Get current user profile
  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      }
    });
    return response.json();
  }
};

// Save auth data to localStorage
export const saveAuthData = (user, token) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
};

// Remove auth data (logout)
export const removeAuthData = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

// Check if user is logged in
export const isLoggedIn = () => {
  return !!localStorage.getItem('token');
};