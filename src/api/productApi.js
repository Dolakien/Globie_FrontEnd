import apiClient from "./apiClient";

const productApi = {
  getAllProduct: () => {
    return apiClient.get("/product/all");
  },
  getAllSellingProduct: () => {
    return apiClient.get("/product/all/selling");
  },
  getAllProcessingProduct: () => {
    return apiClient.get("/product/all/processing");
  },
  deleteProduct: (id) => {
    return apiClient.delete(`/product/delete/${id}`);
  },
  updateStatus: (id) => {
    return apiClient.put(`/product/update_status/${id}`);
  },
  createProduct: (data) => {
    return apiClient.post("/product/create", data);
  },
  uploadImages: (productId, formData) => {
    return apiClient.post(`/product/uploadImages/${productId}`, formData);
  },
  getImageByProductId: (productId) => {
    return apiClient.get(`/product/all_images_statusTrue/${productId}`);
  },
  getProductDetail: (id) => {
    return apiClient.get(`/product/detail/${id}`);
  },
  getMySellingProduct: () => {
    return apiClient.get("/product/all_of_user_selling");
  },
  getMyProcessingProduct: () => {
    return apiClient.get("/product/all_of_user_processing");
  },
  getMySoldProduct: () => {
    return apiClient.get("/product/all_of_user_sold");
  },
};

export default productApi;
