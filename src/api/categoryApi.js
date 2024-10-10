import apiClient from "./apiClient";

const categoryApi = {
  getAllCategory: () => {
    return apiClient.get("/product_category/all");
  },
  deleteCategory: (id) => {
    return apiClient.delete(`/product_category/delete/${id}`);
  },
  addCategory: (data) => {
    return apiClient.post("/product_category/create", data);
  },
  getAllPostCategory: () => {
    return apiClient.get("/post_category/all");
  },
  deletePostCategory: (id) => {
    return apiClient.delete(`post_category/delete/${id}`);
  },
  addPostCategory: (data) => {
    return apiClient.post("/post_category/create", data);
  },
};

export default categoryApi;
