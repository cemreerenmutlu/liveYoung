import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

function App() {
  return (
    <Routes>
      {/* Redirect from root to the login page */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
