import apiClient from "./apiClient";

const accountapi = {
  getAllAccount: () => {
    return apiClient.get("/account/all");
  },
  getAccountByUserName: (username) => {
    return apiClient.get(`/account/get/${username}`);
  },
  createAccount: (data) => {
    return apiClient.post("/account/create", data);
  },
  deleteAccount: (username) => {
    return apiClient.delete(`/account/delete/${username}`);
  },
  getRole: () => {
    return apiClient.get("/account/role/all");
  },
  countUserTrue: () => {
    return apiClient.get("/account/count_true");
  },
  countUserFalse: () => {
    return apiClient.get("/account/count_false");
  },
  getProfile: () => {
    return apiClient.get("/account/my-account");
  },
  updateProfile: (username, data) => {
    return apiClient.put(`/account/update/${username}`, data);
  },
};

export default accountapi;
