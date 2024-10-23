import apiClient from './apiClient'; // Đảm bảo đường dẫn đúng tới apiClient

const transactionApis = {
    getAllTransaction: () => {
        return apiClient.get("/transaction/all"); // Lấy tất cả giao dịch
    },
    filterTransaction: (params) => {
        return apiClient.get("/transaction/filter", { params }); // Truyền params (startDate và endDate) vào đây
    },
};

export default transactionApis;
