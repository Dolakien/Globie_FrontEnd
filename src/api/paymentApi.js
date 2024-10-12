import apiClient from "./apiClient";

const paymentApi = {
  createPaymentUrl: (data) => {
    return apiClient.post("/payment/vn-pay", data);
  },
};

export default paymentApi;
