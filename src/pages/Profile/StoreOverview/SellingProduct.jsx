import { useQuery } from "@tanstack/react-query";
import React from "react";
import productApi from "../../../api/productApi";
import ProductItem from "../../../components/ProductItem/ProductItem";
import { Empty } from "antd";

const SellingProduct = () => {
  const { data } = useQuery({
    queryKey: ["STORE_PRODUCT_SELLING"],
    queryFn: async () => {
      const res = await productApi.getMySellingProduct();

      const products = res.data?.data ?? [];

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

  if (data?.length === 0) {
    return <Empty description="Empty product" className="mt-5" />;
  }

  return (
    <div className="grid grid-cols-12 gap-4 mt-5">
      {data?.map((it) => (
        <ProductItem
          editable
          key={it.productId}
          className="col-span-3"
          data={it}
        />
      ))}
    </div>
  );
};

export default SellingProduct;
