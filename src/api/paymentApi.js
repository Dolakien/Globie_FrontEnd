import apiClient from "./apiClient";

const paymentApi = {
  createPaymentUrl: (data) => {
    return apiClient.post("/payment/pay-os-create", data);
  },
  payOsCallBack: (params) => {
    return apiClient.get("/payment/payos_call_back", {
      params,
    });
  },

  createPayOsStoreUrl: (data) => {
    return apiClient.post("/payment/payos-store", data);
  },
};

export default paymentApi;
