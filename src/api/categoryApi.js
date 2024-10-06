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
};

export default categoryApi;
