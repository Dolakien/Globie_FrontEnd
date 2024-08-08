import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import
import SuccessOverlay from './SuccessOverlay';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState(''); // Added userName state
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // Changed to boolean for conditional rendering
  const navigate = useNavigate(); // For redirecting after success

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // On success, set success to true
    setSuccess(true);
    setTimeout(() => {
      navigate('/home'); // Redirect after 1 second
    }, 1000);
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
  };

  return (
    <div className="login-page">
      {success && <SuccessOverlay />} {/* Show overlay on success */}
      <div className="wrapper">
        <div className="title-text">
          <div className={`title ${isLogin ? 'active' : ''}`}>
            Globie
          </div>
        </div>
        <div className="form-container">
          <div className="slide-controls">
            <input
              type="radio"
              name="slide"
              id="login"
              checked={isLogin}
              onChange={() => setIsLogin(true)}
            />
            <input
              type="radio"
              name="slide"
              id="signup"
              checked={!isLogin}
              onChange={() => setIsLogin(false)}
            />
            <label htmlFor="login" className="slide login">
              Login
            </label>
            <label htmlFor="signup" className="slide signup">
              Signup
            </label>
            <div className="slider-tab"></div>
          </div>
          <div className="form-inner">
          {isLogin ? (
  <form onSubmit={handleSubmit} className="login">
    <div className="field">
      <input
        type="text"
        placeholder="Email Address"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div className="field">
      <input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <div className="field btn">
      <div className="btn-layer"></div>
      <input type="submit" value="Login" />
    </div>
    <div className="google-btn" onClick={handleGoogleLogin}>
      <img src="https://e7.pngegg.com/pngimages/56/318/png-clipart-google-logo-logo-logo-company-text.png" alt="Google Logo" />
      Continue with Google
    </div>
    <div className="signup-link">
      Not a member? <a href="#" onClick={() => setIsLogin(false)}>Signup now</a>
    </div>
    {error && <p className="error">{error}</p>}
  </form>
) : (
  <form onSubmit={handleSubmit} className="signup">
    <div className="field">
      <input
        type="text"
        placeholder="Username"
        required
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
    </div>
    <div className="field">
      <input
        type="text"
        placeholder="Email Address"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div className="field">
      <input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <div className="field">
      <input
        type="password"
        placeholder="Confirm password"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </div>
    <div className="field btn">
      <div className="btn-layer"></div>
      <input type="submit" value="Signup" />
    </div>
    {error && <p className="error">{error}</p>}
  </form>
)}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;