import React, { useState } from "react";
import "./Login.css";
import { toast } from "react-toastify";
import { AuthApi } from "../../api/authApi";
import { jwtDecode } from "jwt-decode";
import { TOKEN_STORAGE_KEY, USER_ROLE_STORAGE_KEY } from "../../constants";
import { Link } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [otp, setOtp] = useState();
  const [step, setStep] = useState("AUTH");

  const handleGoogleLogin = () => {};

  const resetForm = () => {
    setFullName("");
    setPhone("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setOtp("");
    setUserName("");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const res = await AuthApi.signIn({
        userName: email,
        password,
      });

      if (res.data.code !== 200) {
        toast.error(res.data.message);
        return;
      }

      const token = res.data.data.token;
      const decoded = jwtDecode(token);
      if (!decoded.active) {
        await AuthApi.sendOtp(email);
        setStep("VERIFY_OTP");
      } else {
        localStorage.setItem(TOKEN_STORAGE_KEY, token);
        localStorage.setItem(USER_ROLE_STORAGE_KEY, decoded.scope);
        window.location.href = "/";
      }
    } catch (error) {
      toast.error(
        error?.response?.data ||
          error?.response?.data?.message ||
          "An error occurred, please try again!"
      );
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error("Confirm password does not match!");
        return;
      }

      const res = await AuthApi.signUp({
        fullName,
        userName,
        email,
        phone,
        password,
      });

      if (res.data.code !== 200) {
        toast.error(res.data.message);
        return;
      }

      const sendOtpRes = await AuthApi.sendOtp(email);
      toast.success(sendOtpRes.data);

      setStep("VERIFY_OTP");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An error occurred, please try again!"
      );
    }
  };

  const onVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await AuthApi.verifyOtp({ otp, email });
      toast.success(res.data);
      resetForm();
      setIsLogin(true);
      setStep("AUTH");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An error occurred, please try again!"
      );
    }
  };

  return (
    <div className="login-page">
      <div className="wrapper">
        <div className="title-text">
          <div className={`title ${isLogin ? "active" : ""}`}>Globie</div>
        </div>
        <div className="form-container">
          {step === "AUTH" && (
            <>
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
                  <form onSubmit={handleSignIn} className="login">
                    <div className="field">
                      <input
                        type="text"
                        placeholder="Email"
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

                    <div className="forgot-password-wrap">
                      <Link to="/forgot-password" className="forgot-password">
                        Forgot password?
                      </Link>
                    </div>

                    <div className="field btn">
                      <div className="btn-layer"></div>
                      <input type="submit" value="Login" />
                    </div>
                    <div className="google-btn" onClick={handleGoogleLogin}>
                      <img
                        src="https://e7.pngegg.com/pngimages/56/318/png-clipart-google-logo-logo-logo-company-text.png"
                        alt="Google Logo"
                      />
                      Continue with Google
                    </div>
                    <div className="signup-link">
                      Not a member?{" "}
                      <a href="#" onClick={() => setIsLogin(false)}>
                        Signup now
                      </a>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleSignUp} className="signup">
                    <div className="field">
                      <input
                        type="text"
                        placeholder="Full Name"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
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
                        type="text"
                        placeholder="Phone"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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
                  </form>
                )}
              </div>
            </>
          )}

          {step === "VERIFY_OTP" && (
            <div className="form-inner">
              <form onSubmit={onVerifyOtp} className="signup">
                <div className="field">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <div className="field btn">
                  <div className="btn-layer"></div>
                  <input type="submit" value="Verify" />
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
