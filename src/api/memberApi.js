import apiClient from "./apiClient";

const memberApi = {
  getAllMember: () => {
    return apiClient.get("/member/all");
  },
};

export default memberApi;
