import apiClient from "./apiClient";

const commentApi = {
  addComment: (data) => {
    return apiClient.post("/comment/create", data);
  },
  getPostComment: (id) => {
    return apiClient.get(`/comment/all/${id}`);
  },
  deletePostComment: (id) => {
    return apiClient.delete(`/comment/delete/${id}`);
  },
};

export default commentApi;
