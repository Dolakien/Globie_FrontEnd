import { DatePicker, message, Table } from "antd";
import React, { useEffect, useState } from "react";
import transactionApis from "../../../api/transactionApi"; // Đảm bảo đường dẫn chính xác
import moment from "moment";

const { RangePicker } = DatePicker;

const TransactionList = () => {
  const [data, setData] = useState([]); // Dữ liệu gốc từ API
  const [filteredData, setFilteredData] = useState([]); // Dữ liệu đã lọc
  const [selectedDates, setSelectedDates] = useState(null); // Ngày đã chọn

  // Tải dữ liệu khi component được render lần đầu
  useEffect(() => {
    fetchData();
  }, []);

  // Hàm gọi API để lấy tất cả giao dịch
  const fetchData = async () => {
    try {
      const res = await transactionApis.getAllTransaction();
      console.log("Fetched Data:", res.data.data); // Log dữ liệu đã fetch
      setData(res.data.data); // Lưu dữ liệu gốc
      setFilteredData(res.data.data); // Hiển thị tất cả dữ liệu ban đầu
    } catch (error) {
      message.error("Failed to fetch transactions");
      console.error("Fetch error:", error); // Log lỗi
    }
  };

  // Hàm xử lý khi người dùng chọn ngày từ RangePicker
  const handleDateChange = (dates) => {
    console.log("Selected Dates:", dates); // Log để kiểm tra giá trị dates
    setSelectedDates(dates); // Lưu lại ngày đã chọn

    if (!dates || dates.length === 0) {
      setFilteredData(data); // Reset lại dữ liệu nếu không có ngày nào được chọn
      return;
    }

    const [startDate, endDate] = dates;

    if (!startDate || !endDate) {
      message.error("Invalid date range");
      return;
    }

    // Định dạng lại ngày theo định dạng mong muốn
    const formattedStartDate = startDate.format("YYYY-MM-DD");
    const formattedEndDate = endDate.format("YYYY-MM-DD");

    console.log("Formatted Start Date:", formattedStartDate);  
    console.log("Formatted End Date:", formattedEndDate);

    // Lọc dữ liệu cục bộ dựa trên dữ liệu đã fetch trước đó
    const filtered = data.filter((transaction) => {
      const transactionDate = moment(transaction.transactionDate).format("YYYY-MM-DD");
      return transactionDate >= formattedStartDate && transactionDate <= formattedEndDate;
    });

    console.log("Filtered Data:", filtered);

    setFilteredData(filtered); // Cập nhật lại dữ liệu đã lọc
  };

  // Định nghĩa các cột cho bảng
  const columns = [
    {
      title: "TransactionID",
      key: "transactionId",
      dataIndex: "transactionId",
    },
    {
      title: "Transaction Code",
      dataIndex: "transactionCode",
      key: "transactionCode",
    },
    {
      title: "Transaction Date",
      dataIndex: "transactionDate",
      key: "transactionDate",
      render: (text) => moment(text).format("YYYY-MM-DD"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "User ID",
      dataIndex: "userID",
      key: "userID",
    },
    {
      title: "Order Code",
      dataIndex: "orderCode",
      key: "orderCode",
    },
  ];

  return (
    <>
      <h2 className="font-semibold text-2xl mb-4">Transaction List</h2>

      <div className="mb-4">
        <RangePicker
          onChange={handleDateChange} // Bắt sự kiện khi người dùng chọn ngày
          allowClear
          format="YYYY-MM-DD"
          placeholder={["Start date", "End date"]}
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredData} // Hiển thị dữ liệu đã lọc
        scroll={{ x: 900 }}
        rowKey="transactionId"
      />
    </>
  );
};

export default TransactionList;
