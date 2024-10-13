import apiClient from "./apiClient";

const orderApi = {
  getOrders: () => {
    return apiClient.get("/order/all_of_user");
  },
  getPendingOrders: () => {
    return apiClient.get("/order/all_of_user_pending");
  },
  getShippingOrders: () => {
    return apiClient.get("/order/all_of_user_shipping");
  },
  getDeliveredOrders: () => {
    return apiClient.get("/order/all_of_user_delivered");
  },
};

export default orderApi;
