import React from "react";

import { useQuery } from "@tanstack/react-query";
import productApi from "../../api/productApi";
import { formatPrice } from "../../utils/formatPrice";
import { Link } from "react-router-dom";

const ProductRelated = ({ categoryId }) => {
  const { data: productRelated } = useQuery({
    queryKey: ["PRODUCT_RELATED", categoryId],
    queryFn: async () => {
      const res = await productApi.getProductByCategory(categoryId);

      return res.data.data;
    },
  });

  return (
    <div className="mt-2 pt-6 border-t">
      <p className="uppercase text-[#262626] font-medium">
        You might also like
      </p>

      <div className="mt-4 grid grid-cols-12 gap-2 mb-10">
        {productRelated?.slice(0, 3)?.map((it) => (
          <div
            className="col-span-4 flex gap-2 items-center"
            key={it.productId}
          >
            <img
              src="/images/mouse.png"
              alt="Product"
              className="block w-32 object-cover"
            />

            <div className="flex-1">
              <Link
                to={`/products/${it.productId}`}
                className="font-semibold text-[#262626] mb-3"
              >
                {it.productName}
              </Link>

              <div className="flex items-center mb-4 gap-x-4 gap-y-1 flex-wrap">
                <p className="font-semibold text-[#FF2E00]">$69.99</p>
                <p className="text-[#555555]">$129.99</p>
                <p className="px-2 text-sm py-1 font-medium rounded-md bg-[#FF2E00] text-white">
                  - 40%
                </p>
              </div>

              <button className="h-9 rounded border border-[#7B7B7B] flex items-center justify-center gap-x-3 px-4 cursor-pointer">
                <p className="text-sm font-semibold text-[#555555]">
                  {formatPrice(it.price)}đ
                </p>

                <p className="text-sm text-[#262626] font-medium">
                  Add to cart
                </p>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRelated;
