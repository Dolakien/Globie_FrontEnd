import apiClient from "./apiClient";

const reportApi = {
  getAllReport: () => {
    return apiClient.get("/report/all");
  },
  getAllReportApproved: () => {
    return apiClient.get("/report/all/approved");
  },
  getAllReportRejected: () => {
    return apiClient.get("/report/all/rejected");
  },
  getAllReportProccessing: () => {
    return apiClient.get("/report/all/processing");
  },
  getReportDetail: (id) => {
    return apiClient.get(`/report/detail/${id}`);
  },
  deleteReport: (id) => {
    return apiClient.delete(`report/delete/${id}`);
  },
  updateReportApproved: (id) => {
    return apiClient.put(`/report/update_status_approved/${id}`);
  },
  updateReportRejected: (id) => {
    return apiClient.put(`/report/update_status_rejected/${id}`);
  },
  
};

export default reportApi;