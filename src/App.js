// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

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
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  );
};

// Component to conditionally display Header based on current path
const HeaderWithConditionalDisplay = () => {
  const location = useLocation();
  const isShowHeader = !["/login", "/forgot-password"].includes(
    location.pathname
  );
  return isShowHeader ? <Header /> : null;
};

export default App;
