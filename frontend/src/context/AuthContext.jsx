import { createContext, useCallback, useMemo, useState } from "react";
import * as authApi from "../api/authApi";
import { getToken, setToken, removeToken, isTokenExpired } from "../utils/tokenUtils";
import { getItem, setItem, removeItem } from "../utils/storage";
import { STORAGE_KEYS } from "../constants/appConstants";

export const AuthContext = createContext(null);

const resolveInitialUser = () => {
  const token = getToken();
  if (!token || isTokenExpired(token)) {
    removeToken();
    removeItem(STORAGE_KEYS.USER);
    return null;
  }
  return getItem(STORAGE_KEYS.USER);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(resolveInitialUser);
  const [isInitializing] = useState(false);

  const login = useCallback(async (credentials) => {
    const data = await authApi.login(credentials);
    const token = data.token || data.accessToken;
    const nextUser = data.user || {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
    };

    setToken(token);
    setItem(STORAGE_KEYS.USER, nextUser);
    setUser(nextUser);
    return nextUser;
  }, []);

  const register = useCallback(async (payload) => {
    const data = await authApi.register(payload);
    return data;
  }, []);

  const logout = useCallback(() => {
    removeToken();
    removeItem(STORAGE_KEYS.USER);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isInitializing,
      login,
      register,
      logout,
    }),
    [user, isInitializing, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
