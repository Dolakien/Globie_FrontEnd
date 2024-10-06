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
};

export default productApi;
