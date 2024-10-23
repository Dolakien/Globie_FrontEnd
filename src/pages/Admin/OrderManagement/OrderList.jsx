/* eslint-disable default-case */
import { Flex, message, Popconfirm, Table, Tag } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import orderApi from "../../../api/orderApi";
import { formatPrice } from "../../../utils/formatPrice";

const OrderList = () => {
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  useEffect(() => {
    fetchData();
  }, [type]);

  const fetchData = useCallback(async () => {
    try {
      let data = [];

      switch (type) {
        case "pending": {
          const res = await orderApi.getOrdersPending();
          data = res.data.data;
          break;
        }

        case "shipping": {
          const res = await orderApi.getOrdersShipping();
          data = res.data.data;
          break;
        }

        case "cancelled": {
          const res = await orderApi.getOrdersCancel();
          data = res.data.data;
          break;
        }

        default: {
          const res = await orderApi.getOrders();
          data = res.data.data;
        }
      }

      setData(data);
    } catch (error) {
      message.error("Failed to fetch orders");
    }
  }, [type]);

  const columns = useMemo(() => {
    const columns = [
        {
            title: "Order ID",
            dataIndex: "orderId",
            key: "orderId",
          },
          {
            title: "Order Code",
            dataIndex: "orderCode",
            key: "orderCode",
          },
          {
            title: "Order Date",
            dataIndex: "orderDate",
            key: "orderDate",
          },
          {
            title: "Total Amount",
            dataIndex: "totalAmount",
            key: "totalAmount",
            render: (price) => formatPrice(price) + "đ",
          },
          {
            title: "Status",
            dataIndex: "status",
            key: "status",
          },
          {
            title: "Payment Method",
            dataIndex: "paymentMethodOrder",
            key: "paymentMethodOrder",
          },
          {
            title: "User ID",
            dataIndex: "userId",
            key: "userId",
          },
          {
            title: "Shipping ID",
            dataIndex: "shippingId",
            key: "shippingId",
          },
    ];
    return columns;
  },
 );
  
 const renderTitle = () => {
  if (!type) {
    return "All Orders"; // Default case when type is undefined or null
  }

  switch (type) {
    case "pending":
      return "Pending Orders";
    case "shipping":
      return "Shipping Orders";
    case "cancelled":
      return "Cancelled Orders";
    default:
      return "All Orders";
  }
};

return (
  <>
    <h2 className="font-semibold text-2xl mb-4">{renderTitle()}</h2>
    <Table columns={columns} dataSource={data} rowKey="orderId" />
  </>
);
};


export default OrderList;
