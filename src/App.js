// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Home from './Home';
import Login from './Login/Login';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <div className="App">
        <HeaderWithConditionalDisplay />
        <Routes>
          {/* Redirect from root path to /home */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

// Component to conditionally display Header based on current path
const HeaderWithConditionalDisplay = () => {
  const location = useLocation();
  return location.pathname !== '/login' ? <Header /> : null;
};

export default App;
