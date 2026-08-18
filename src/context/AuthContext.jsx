import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api } from '@/services/api';
import { mockUser } from '@/data/workshopMockData';

const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  isDemoMode: false,
  loading: true,
  login: async () => {},
  demoLogin: () => {},
  register: async () => {},
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // Restore session on mount — checks both real token and demo session
  useEffect(() => {
    // Check demo session first (completely separate from real auth)
    const demoSession = localStorage.getItem('cj_demo_session');
    if (demoSession === 'active') {
      setUser(mockUser);
      setIsDemoMode(true);
      setLoading(false);
      return;
    }

    // Real auth session
    const stored = localStorage.getItem('cj_token');
    if (!stored) {
      setLoading(false);
      return;
    }
    setToken(stored);
    api
      .getProfile()
      .then((data) => {
        setUser(data.user || data);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem('cj_token');
        setToken(null);
        setUser(null);
        setLoading(false);
      });
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await api.login({ email, password });
    const newToken = data.token;
    const newUser = data.user;
    if (!newToken) throw { status: 500, message: 'Authentication failed. No token received.' };
    localStorage.setItem('cj_token', newToken);
    setToken(newToken);
    setUser(newUser);
    setIsDemoMode(false);
    return newUser;
  }, []);

  // Demo login — frontend only, no API call. Completely isolated from real auth.
  const demoLogin = useCallback(() => {
    localStorage.setItem('cj_demo_session', 'active');
    setUser(mockUser);
    setIsDemoMode(true);
    setToken(null);
  }, []);

  const register = useCallback(async (payload) => {
    const data = await api.register(payload);
    return data;
  }, []);

  const logout = useCallback(() => {
    // Clear both real and demo sessions
    localStorage.removeItem('cj_token');
    localStorage.removeItem('cj_demo_session');
    setToken(null);
    setUser(null);
    setIsDemoMode(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token || isDemoMode,
        isDemoMode,
        loading,
        login,
        demoLogin,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
