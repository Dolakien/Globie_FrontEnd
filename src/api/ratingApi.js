import apiClient from "./apiClient";

const ratingApi = {
  getProductRating: (productId) => {
    return apiClient.get(`/rates/product/${productId}`);
  },
};

export default ratingApi;
