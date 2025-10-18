import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from './components/Layout/PrivateRoute';
import Navbar from './components/Layout/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import TaskList from './components/Tasks/TaskList';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/" /> : <Register />}
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
              <Navbar />
              <Dashboard />
            </div>
          </PrivateRoute>
        }
      />
      <Route
        path="/tasks"
        element={
          <PrivateRoute>
            <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
              <Navbar />
              <TaskList />
            </div>
          </PrivateRoute>
        }
      />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
