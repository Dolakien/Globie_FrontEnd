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
  createPost: (data) => {
    return apiClient.post("/post/create", data);
  },
  uploadImages: (postId, formData) => {
    return apiClient.post(`/post/uploadImages/${postId}`, formData);
  },
  getImageByPostId: (postId) => {
    return apiClient.get(`/post/all_images_statusTrue/${postId}`);
  },
  deletePosttImage: (imageCode) => {
    return apiClient.delete(`/post/deleteImage/${imageCode}`);
  },
};

export default postApi;