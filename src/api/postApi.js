import apiClient from "./apiClient";

const postApi = {
  getAllPost: () => {
    return apiClient.get("/post/all");
  },
  getAllPostApproved: () => {
    return apiClient.get("/post/all/true");
  },
  getAllPostProccessing: () => {
    return apiClient.get("/post/all/false");
  },
  getPostDetail: (id) => {
    return apiClient.get(`/post/detail/${id}`);
  },
  deletePost: (id) => {
    return apiClient.delete(`/post/delete/${id}`);
  },
  updatePostApproved: (id) => {
    return apiClient.put(`/post/update_status/${id}`);
  },
};

export default postApi;