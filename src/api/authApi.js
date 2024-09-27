import apiClient from "./apiClient";

export const AuthApi = {
  signUp: (data) => {
    return apiClient.post("/authen/register", data);
  },
  signIn: (data) => {
    return apiClient.post("/authen/login", data);
  },
  sendOtp: (email) => {
    return apiClient.post("/authen/send-otp", null, {
      params: {
        email,
      },
    });
  },
  sendOtpChangePassword: (email) => {
    return apiClient.post("/authen/send-otp-change-password", null, {
      params: {
        email,
      },
    });
  },
  verifyOtp: ({ email, otp }) => {
    return apiClient.post("/authen/verify-otp", null, {
      params: { email, otp },
    });
  },
  changePasswordVerifyOtp: ({ email, otp }) => {
    return apiClient.post("/authen/verify-otp-change-password", null, {
      params: { email, otp },
    });
  },
  changePassword: ({ email, password }) => {
    return apiClient.post("/authen/change-password", null, {
      params: {
        email,
        password,
      },
    });
  },
};
