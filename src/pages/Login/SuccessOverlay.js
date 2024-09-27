import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import SuccessOverlay from './SuccessOverlay'; // Import SuccessOverlay component

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState(''); // State for userName
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showOverlay, setShowOverlay] = useState(false); // State to control overlay visibility

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here

    if (isLogin) {
      // Simulate successful login
      setSuccess('Login successful!');
      setShowOverlay(true); // Show success overlay
    } else {
      // Simulate successful signup
      if (password === confirmPassword) {
        setSuccess('Signup successful!');
        setShowOverlay(true); // Show success overlay
      } else {
        setError('Passwords do not match.');
      }
    }
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
  };

  return (
    <div className="login-page">
      {showOverlay && <SuccessOverlay />} {/* Conditionally render overlay */}
      <div className="wrapper">
        <div className="title-text">
          <div className={`title ${isLogin ? 'active' : ''}`}>Globie</div>
          <div className={`title ${!isLogin ? 'active' : ''}`}>Signup Form</div>
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
                <div className="signup-link">
                  Not a member? <a href="#" onClick={() => setIsLogin(false)}>Signup now</a>
                </div>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="signup">
                <div className="field">
                  <input
                    type="text"
                    placeholder="User Name"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)} // Handle userName input
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
                {success && <p className="success">{success}</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
