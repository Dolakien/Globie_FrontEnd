import apiClient from "./apiClient";

const shippingAddressApi = {
  getMyShippingAddress: () => {
    return apiClient.get("/shippingAddress/all_of_user");
  },

  addAddress: (data) => {
    return apiClient.post("/shippingAddress/create", data);
  },

  updateAddress: (id, data) => {
    return apiClient.put(`/shippingAddress/update/${id}`, data);
  },

  removeAddress: (id) => {
    return apiClient.delete(`/shippingAddress/delete/${id}`);
  },
};

export default shippingAddressApi;
