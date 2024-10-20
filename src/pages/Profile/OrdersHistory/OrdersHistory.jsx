import React, { useMemo, useState } from "react";

import styles from "./index.module.css";

import { useQuery } from "@tanstack/react-query";
import { Empty, Table } from "antd";
import orderApi from "../../../api/orderApi";
import { formatPrice } from "../../../utils/formatPrice";
import { PAYMENT_METHOD } from "../../../constants";
import dayjs from "dayjs";

const TABS = [
  {
    id: 1,
    label: "Tất cả",
  },
  {
    id: 2,
    label: "Chờ xác nhận",
  },
  {
    id: 3,
    label: "Chờ vận chuyển",
  },
  {
    id: 4,
    label: "Hoàn tất",
  },
];

const OrdersHistory = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  const { data } = useQuery({
    queryKey: ["USER_ORDER_HISTORY", activeTab],
    queryFn: async () => {
      let res;
      switch (activeTab) {
        case 1: {
          res = await orderApi.getOrders();
          break;
        }

        case 2: {
          res = await orderApi.getPendingOrders();
          break;
        }

        case 3: {
          res = await orderApi.getShippingOrders();
          break;
        }

        case 4: {
          res = await orderApi.getDeliveredOrders();
          break;
        }

        default:
      }

      return res?.data?.data ?? [];
    },
  });

  const columns = useMemo(() => {
    const columns = [
      {
        title: "Id",
        key: "id",
        dataIndex: "orderId",
      },
      {
        title: "Order Code",
        key: "orderCode",
        dataIndex: "orderCode",
      },
      {
        title: "Total Amount",
        key: "totalAmount",
        dataIndex: "totalAmount",
        render: (val) => formatPrice(val) + "đ",
      },
      {
        title: "Payment Method",
        key: "paymentMethod",
        dataIndex: "paymentMethodOrder",
        render: (val) => {
          if (val === PAYMENT_METHOD.ELECTRONIC_PAYMENT) {
            return "PAYOS";
          }

          return "COD";
        },
      },
      {
        title: "Order Date",
        key: "orderDate",
        dataIndex: "orderDate",
        render: (date) => dayjs(date).format("DD/MM/YYYY HH:mm:ss"),
      },
    ];

    if (activeTab === 1) {
      columns.splice(2, 0, {
        title: "Status",
        key: "status",
        dataIndex: "status",
      });
    }

    return columns;
  }, [activeTab]);

  return (
    <>
      <h2 className="text-[24px] font-semibold px-6 py-4 text-[#333] leading-tight">
        Lịch sử đặt hàng
      </h2>

      <div className="flex items-center justify-between mt-3 overflow-x-auto">
        {TABS.map((it, idx) => (
          <p
            key={idx}
            className={`${styles.tabItem} ${
              activeTab === it.id && styles.active
            }`}
            onClick={() => setActiveTab(it.id)}
          >
            <span>{it.label}</span>

            {activeTab === it.id && data?.length > 0 && (
              <span className="text-[#ff3c53]"> ({data.length})</span>
            )}
          </p>
        ))}
      </div>

      {data?.length > 0 ? (
        <Table
          className="mt-4 mx-5"
          bordered
          columns={columns}
          dataSource={data}
        />
      ) : (
        <Empty description="Empty order" className="mt-12" />
      )}
    </>
  );
};

export default OrdersHistory;
