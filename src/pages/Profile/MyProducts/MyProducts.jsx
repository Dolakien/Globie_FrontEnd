import React, { useState } from "react";

import styles from "./index.module.css";
import ProductItem from "../../../components/ProductItem/ProductItem";

import { useQuery } from "@tanstack/react-query";
import productApi from "../../../api/productApi";
import { Empty } from "antd";

const TABS = [
  {
    id: 1,
    label: "Đang hiển thị",
  },
  {
    id: 2,
    label: "Chờ duyệt",
  },
];

const MyProducts = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  const { data } = useQuery({
    queryKey: ["USER_PRODUCT", activeTab],
    queryFn: async () => {
      let products = [];
      if (activeTab === 1) {
        const res = await productApi.getMyProcessingProduct();

        products = res.data?.data ?? [];
      } else {
        const res = await productApi.getMySellingProduct();
        products = res.data?.data ?? [];
      }

      const productImageMap = await Promise.all(
        products.map(async (it) => {
          const imageRes = await productApi.getImageByProductId(it.productId);

          return {
            ...it,
            images: imageRes.data?.data || [],
          };
        })
      );

      return productImageMap;
    },
  });

  return (
    <>
      <h2 className="text-[24px] font-semibold px-6 py-4 text-[#333] leading-tight">
        Sản phẩm của tôi
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
        <div className="grid grid-cols-12 gap-4 m-4">
          {data?.map((it) => (
            <ProductItem
              editable
              key={it.productId}
              className="col-span-4"
              data={it}
            />
          ))}
        </div>
      ) : (
        <Empty description="Empty product" className="mt-12" />
      )}
    </>
  );
};

export default MyProducts;
