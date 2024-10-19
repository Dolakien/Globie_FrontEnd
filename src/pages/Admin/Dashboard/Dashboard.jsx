import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2'; 
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Legend, Tooltip, ArcElement } from 'chart.js';
import orderApi from "../../../api/orderApi";
import userApi from "../../../api/accountApi";
import productApi from "../../../api/productApi";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Legend, Tooltip, ArcElement);

const BarChart = () => {
  const [dailyRevenue, setDailyRevenue] = useState(0);
  const [yearlyRevenue, setYearlyRevenue] = useState(0);
  const [orderCounts, setOrderCounts] = useState({ shipping: 0, pending: 0, cancelled: 0 });
  
  // State để lưu số lượng người dùng đã đăng ký và chưa xác nhận
  const [userCounts, setUserCounts] = useState({ registered: 0, unverified: 0 });

  // State để lưu số lượng sản phẩm
  const [productCounts, setProductCounts] = useState({ selling: 0, sold: 0, processing: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy doanh thu
        const dailyResponse = await orderApi.countOrderByDay();
        const yearlyResponse = await orderApi.countOrderByYear();

        setDailyRevenue(dailyResponse.data.data);
        setYearlyRevenue(yearlyResponse.data.data);

        // Lấy số lượng đơn hàng
        const shippingResponse = await orderApi.countOrderShipping();
        const pendingResponse = await orderApi.countOrderPending();
        const cancelledResponse = await orderApi.countOrderCancel();

        setOrderCounts({
          shipping: shippingResponse.data.data,
          pending: pendingResponse.data.data,
          cancelled: cancelledResponse.data.data,
        });

        // Lấy số lượng người dùng
        const registeredResponse = await userApi.countUserTrue();
        const unverifiedResponse = await userApi.countUserFalse();

        setUserCounts({
          registered: registeredResponse.data.data,
          unverified: unverifiedResponse.data.data,
        });

        // Lấy số lượng sản phẩm
        const sellingResponse = await productApi.countProductSelling();
        const soldResponse = await productApi.countProductSold();
        const processingResponse = await productApi.countProductProcessing();

        setProductCounts({
          selling: sellingResponse.data.data,
          sold: soldResponse.data.data,
          processing: processingResponse.data.data,
        });

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const revenueData = {
    labels: ['Doanh thu hàng ngày', 'Doanh thu năm 2024'],
    datasets: [
      {
        label: 'Doanh thu',
        data: [dailyRevenue / 1000000, yearlyRevenue / 1000000],
        backgroundColor: ['#FFC6BF', '#FFC6BF'],  
      },
    ],
  };

  const orderData = {
    labels: ['Thành công', 'Chờ xử lý', 'Đã hủy'],
    datasets: [
      {
        label: 'Số lượng đơn hàng',
        data: [orderCounts.shipping, orderCounts.pending, orderCounts.cancelled],
        backgroundColor: ['#6FC7E1', '#FDE3C8', '#FFA883'],
      },
    ],
  };

  // Dữ liệu cho biểu đồ người dùng
  const userData = {
    labels: ['Người dùng đã đăng ký', 'Người dùng chưa xác nhận'],
    datasets: [
      {
        label: 'Số lượng người dùng',
        data: [userCounts.registered, userCounts.unverified],
        backgroundColor: ['#7F886A', '#7F886A'],
      },
    ],
  };

  const formatNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Thêm dấu chấm vào số
  };

  const revenueOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: 'TỔNG QUAN DOANH SỐ BÁN HÀNG CỦA NỀN TẢNG GLOBIE',
        font: {
          size: 18,
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        title: {
          display: true,
          text: 'Triệu đồng',
          align: 'start',
          font: {
            size: 16,
          },
          padding: {
            top: 20,
          },
        },
        ticks: {
          stepSize: 10,
          callback: function (value) {
            return formatNumber(value);
          },
        },
      },
    },
  };

  const userOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: 'THỐNG KÊ NGƯỜI DÙNG TRÊN NỀN TẢNG GLOBIE',
        font: {
          size: 18,
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        title: {
          display: true,
          text: 'Số lượng',
          align: 'start',
          font: {
            size: 16,
          },
          padding: {
            top: 20,
          },
        },
        ticks: {
          stepSize: 5,
        },
      },
    },
  };

  const orderOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: 'THỐNG KÊ ĐƠN HÀNG TRÊN NỀN TẢNG GLOBIE', 
        font: {
          size: 18,
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', padding: '20px' }}>
      <div style={{ width: '40%', padding: '20px', border: '2px solid #B7AC9A', borderRadius: '8px', marginRight: '20px' }}>
        <Pie data={orderData} options={orderOptions} />
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <p>Tổng sản phẩm đang bán: {productCounts.selling}</p>
          <p>Tổng sản phẩm đã bán: {productCounts.sold}</p>
          <p>Tổng sản phẩm chờ duyệt: {productCounts.processing}</p>
        </div>
      </div>
      <div style={{ width: '60%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ padding: '20px', border: '2px solid #B7AC9A', borderRadius: '8px' }}>
          <Bar data={revenueData} options={revenueOptions} />
        </div>
        <div style={{ padding: '20px', border: '2px solid #B7AC9A', borderRadius: '8px' }}>
          <Bar data={userData} options={userOptions} />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
