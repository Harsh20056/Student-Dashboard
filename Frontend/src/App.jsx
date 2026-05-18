import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import ForgotPassword from './pages/Auth/ForgotPassword.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Journal from './pages/Journal/Journal.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Navbar from './components/Layout/Navbar.jsx';
import ProtectedRoute from './components/Auth/ProtectedRoute.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/journal"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <Journal />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;