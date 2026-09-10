import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api, ApiError } from '../lib/api';

const AuthContext = createContext(null);
const STORAGE_KEY = 'admin_token';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY));
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function verify() {
      if (!token) {
        if (!cancelled) setChecked(true);
        return;
      }
      try {
        await api.get('/auth/me', token);
        if (!cancelled) setChecked(true);
      } catch {
        if (!cancelled) {
          setToken(null);
          localStorage.removeItem(STORAGE_KEY);
          setChecked(true);
        }
      }
    }

    verify();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const login = useCallback(async (email, password) => {
    const data = await api.post('/auth/login', { email, password });
    localStorage.setItem(STORAGE_KEY, data.access_token);
    setToken(data.access_token);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setToken(null);
  }, []);

  const handleAuthError = useCallback((error) => {
    if (error instanceof ApiError && error.status === 401) {
      logout();
    }
  }, [logout]);

  const value = useMemo(
    () => ({ token, isAuthenticated: Boolean(token), checked, login, logout, handleAuthError }),
    [token, checked, login, logout, handleAuthError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}