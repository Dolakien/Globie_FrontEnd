import apiClient from "./apiClient";

const shippingAddressApi = {
  getMyShippingAddress: () => {
    return apiClient.get("/shippingAddress/all_of_user");
  },
};

export default shippingAddressApi;
