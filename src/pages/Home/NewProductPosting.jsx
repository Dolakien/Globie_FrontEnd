import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProductItem from "../../components/ProductItem/ProductItem";
import { useQuery } from "@tanstack/react-query";
import productApi from "../../api/productApi";

const NewProductPosting = () => {
  const { data } = useQuery({
    queryKey: ["PRODUCT_SELLING"],
    queryFn: async () => {
      const res = await productApi.getAllSellingProduct();
      const products = res.data?.data || [];
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
    <div className="container mx-auto px-3 mb-12">
      <div className="flex items-center justify-between">
        <p className="text-[28px] font-medium">New Products Posting</p>

        <Link className="flex items-center gap-1">
          <p className="text-[#262626] text-xs">View all</p>

          <FaAngleRight className="text-xs" />
        </Link>
      </div>

      <div className="mt-3 grid grid-cols-12 gap-4">
        {data?.slice(0, 4).map((it) => (
          <ProductItem key={it.productId} data={it} />
        ))}
      </div>
    </div>
  );
};

export default NewProductPosting;
