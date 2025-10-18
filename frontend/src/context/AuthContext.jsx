import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: true,
  error: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing token on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      if (token && user) {
        try {
          // First, set the user as authenticated immediately to prevent flash
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: {
              token,
              user: JSON.parse(user),
            },
          });

          // Then verify token in the background (optional)
          // We'll try to verify, but if it fails, we'll keep the user logged in
          // and let the API calls handle the authentication
          try {
            const response = await authAPI.verifyToken();
            if (!response.data.success) {
              // Token is invalid, clear storage and logout
              localStorage.removeItem('token');
              localStorage.removeItem('tokenType');
              localStorage.removeItem('expiresIn');
              localStorage.removeItem('user');
              dispatch({ type: 'LOGOUT' });
            }
          } catch (verifyError) {
            // If verification fails, we'll keep the user logged in
            // The API calls will handle authentication errors
            console.log('Token verification failed, but keeping user logged in:', verifyError.message);
            // Only clear if it's a clear authentication error
            if (verifyError.response?.status === 401 && verifyError.response?.data?.message?.includes('Token')) {
              localStorage.removeItem('token');
              localStorage.removeItem('tokenType');
              localStorage.removeItem('expiresIn');
              localStorage.removeItem('user');
              dispatch({ type: 'LOGOUT' });
            }
          }
        } catch (error) {
          // If there's an error parsing user data, clear storage
          localStorage.removeItem('token');
          localStorage.removeItem('tokenType');
          localStorage.removeItem('expiresIn');
          localStorage.removeItem('user');
          dispatch({ type: 'LOGOUT' });
        }
      } else {
        dispatch({ type: 'LOGOUT' });
      }
    };

    // Immediate check without delay
    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      dispatch({ type: 'LOGIN_START' });
      const response = await authAPI.login(credentials);
      const { token, tokenType, expiresIn, ...user } = response.data.data;

      // Store JWT token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('tokenType', tokenType || 'Bearer');
      localStorage.setItem('expiresIn', expiresIn || '30d');
      localStorage.setItem('user', JSON.stringify(user));

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { token, user },
      });

      console.log('JWT Token stored successfully:', {
        tokenType,
        expiresIn,
        userId: user.id
      });

      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: message,
      });
      return { success: false, error: message };
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: 'LOGIN_START' });
      const response = await authAPI.register(userData);
      const { token, tokenType, expiresIn, ...user } = response.data.data;

      // Store JWT token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('tokenType', tokenType || 'Bearer');
      localStorage.setItem('expiresIn', expiresIn || '30d');
      localStorage.setItem('user', JSON.stringify(user));

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { token, user },
      });

      console.log('JWT Token created for new user:', {
        tokenType,
        expiresIn,
        userId: user.id
      });

      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: message,
      });
      return { success: false, error: message };
    }
  };

  const logout = () => {
    // Clear all JWT-related data
    localStorage.removeItem('token');
    localStorage.removeItem('tokenType');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    console.log('JWT Token cleared - user logged out');
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
