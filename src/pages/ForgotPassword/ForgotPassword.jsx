import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthApi } from "../../api/authApi";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [otp, setOtp] = useState();
  const [newPassword, setNewPassword] = useState();
  const [step, setStep] = useState("ENTER_EMAIL");
  const navigate = useNavigate();

  const onSendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await AuthApi.sendOtpChangePassword(email);
      toast.success(res.data);
      setStep("ENTER_OTP");
    } catch (error) {
      toast.error(
        error?.response?.data || "An error occurred, please try again!"
      );
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    try {
      await AuthApi.changePasswordVerifyOtp({ email, otp });
      setStep("NEW_PASSWORD");
    } catch (error) {
      toast.error(
        error?.response?.data ||
          error?.response?.data?.message ||
          "An error occurred, please try again!"
      );
    }
  };

  const onResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await AuthApi.changePassword({
        email,
        password: newPassword,
      });
      toast.success(res.data);
      navigate("/login");
    } catch (error) {
      toast.error(
        error?.response?.data ||
          error?.response?.data?.message ||
          "An error occurred, please try again!"
      );
    }
  };
  return (
    <div className="login-page forgot-password-page">
      <div className="wrapper">
        <div className="title-text">
          <div className="title">Forgot Password</div>
        </div>
        <div className="form-container">
          <div className="form-inner">
            {step === "ENTER_EMAIL" && (
              <form className="login" onSubmit={onSendOtp}>
                <div className="field">
                  <input
                    type="text"
                    placeholder="Email Address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="field btn">
                  <div className="btn-layer"></div>
                  <input type="submit" value="Submit" />
                </div>
              </form>
            )}

            {step === "ENTER_OTP" && (
              <form className="login" onSubmit={onSubmitOtp}>
                <div className="field">
                  <input
                    type="text"
                    placeholder="OTP"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>

                <div className="field btn">
                  <div className="btn-layer"></div>
                  <input type="submit" value="Submit" />
                </div>
              </form>
            )}

            {step === "NEW_PASSWORD" && (
              <form className="login" onSubmit={onResetPassword}>
                <div className="field">
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div className="field btn">
                  <div className="btn-layer"></div>
                  <input type="submit" value="Reset Password" />
                </div>
              </form>
            )}

            <div className="signup-link">
              Already account? <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
