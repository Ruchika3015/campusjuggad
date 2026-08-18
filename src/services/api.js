const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

/**
 * Low-level fetch wrapper for the CampusJugaad REST API.
 * Automatically attaches the JWT bearer token when available.
 * Returns parsed JSON or throws a structured error.
 */
export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('cj_token');

  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  };

  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, config);
  } catch {
    throw { status: 0, message: 'Exchange unavailable. Check your connection and try again.' };
  }

  let data;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message =
      data?.message ||
      data?.error ||
      (response.status === 401 ? 'Invalid email or password.' : 'Something went wrong on the exchange. Please try again.');
    throw { status: response.status, message, data };
  }

  return data;
}

export const api = {
  register: (payload) =>
    apiRequest('/api/v1/users/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  login: (payload) =>
    apiRequest('/api/v1/users/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getProfile: () => apiRequest('/api/v1/users/profile'),

  getColleges: () => apiRequest('/api/v1/colleges'),
};
