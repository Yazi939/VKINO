import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Проверка токена при загрузке
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          // Настройка заголовка для запросов
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Получение данных пользователя
          const res = await axios.get('/api/auth/user');
          setUser(res.data);
          setIsAuthenticated(true);
        } catch (err) {
          // Удаление токена при ошибке
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
          setIsAuthenticated(false);
          delete axios.defaults.headers.common['Authorization'];
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  // Регистрация пользователя
  const register = async (formData) => {
    try {
      const res = await axios.post('/api/auth/register', formData);
      
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Ошибка регистрации' 
      };
    }
  };

  // Вход пользователя
  const login = async (formData) => {
    try {
      const res = await axios.post('/api/auth/login', formData);
      
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Ошибка входа' 
      };
    }
  };

  // Выход пользователя
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 