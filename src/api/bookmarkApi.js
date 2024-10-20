import apiClient from "./apiClient";

const bookmarkApi = {
  addProduct: (productId) => {
    return apiClient.post(`/bookmark/create/${productId}`);
  },

  getAllBookmark: () => {
    return apiClient.get("/bookmark/all_of_user");
  },

  removeProduct: (productId) => {
    return apiClient.delete(`/bookmark/delete/${productId}`);
  },
};

export default bookmarkApi;
