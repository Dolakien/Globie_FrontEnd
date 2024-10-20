import React from "react";

import ProductItem from "../../../components/ProductItem/ProductItem";

import { useQuery } from "@tanstack/react-query";
import productApi from "../../../api/productApi";
import { Empty } from "antd";
import bookmarkApi from "../../../api/bookmarkApi";

const Bookmark = () => {
  const { data } = useQuery({
    queryKey: ["USER_BOOKMARK"],
    queryFn: async () => {
      let products = [];
      const res = await bookmarkApi.getAllBookmark();

      products = res.data?.data ?? [];

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
        Sản phẩm yêu thích
      </h2>

      {data?.length > 0 ? (
        <div className="grid grid-cols-12 gap-4 m-4">
          {data?.map((it) => (
            <ProductItem key={it.productId} className="col-span-4" data={it} />
          ))}
        </div>
      ) : (
        <Empty description="Empty product" className="mt-12" />
      )}
    </>
  );
};

export default Bookmark;
