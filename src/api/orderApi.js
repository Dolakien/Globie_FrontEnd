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
  getdOrders: () => {
    return apiClient.get("/order/all");
  },
  getOrdersShipping: () => {
    return apiClient.get("/order/all_shipping");
  },
  getOrdersPending: () => {
    return apiClient.get("/order/all_pending");
  },
  getOrdersCancel: () => {
    return apiClient.get("/order/all_cancel");
  },
  countOrderByDay: () => {
    return apiClient.get("/order/count_day");
  },
  countOrderByYear: () => {
    return apiClient.get("/order/count_year");
  },
  countOrderShipping: () => {
    return apiClient.get("/order/count_shipping");
  },
  countOrderPending: () => {
    return apiClient.get("/order/count_pending");
  },
  countOrderCancel: () => {
    return apiClient.get("/order/count_cancel");
  },
};

export default orderApi;
