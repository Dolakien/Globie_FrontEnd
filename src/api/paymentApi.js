import apiClient from "./apiClient";

const paymentApi = {
  createPaymentUrl: (data) => {
    return apiClient.post("/payment/vn-pay", data);
  },
  vnpayCallBack: (params) => {
    return apiClient.get("/payment/call-back", {
      params,
    });
  },
};

export default paymentApi;
