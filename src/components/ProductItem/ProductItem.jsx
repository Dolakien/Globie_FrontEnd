import classNames from "classnames";
import React from "react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";

const ProductItem = ({ className, data }) => {
  return (
    <div
      className={classNames(
        "col-span-3 shadow-[0px_0px_12px_0px_#0000001A] rounded-lg px-3 py-4 text-center",
        className
      )}
    >
      <div className="relative pt-[100%]">
        <img
          src={data.images?.[0]?.imagePath || "/images/product-image.jpeg"}
          alt="Product img"
          className="block object-cover w-full h-full absolute top-0 right-0 bottom-0 left-0"
        />
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="text-left">
          <Link
            to={`/products/${data.productId}`}
            className="font-bold text-[#262626]"
          >
            {data.productName}
          </Link>

          <p className="my-2 text-[#555555] text-xs">
            {data.productCategory.categoryName}
          </p>
        </div>

        <FaRegHeart className="cursor-pointer" />
      </div>

      <div className="flex items-center gap-1">
        <div className="flex items-center">
          <FaStar className="text-xs text-[#FFC000]" />
          <FaStar className="text-xs text-[#FFC000]" />
          <FaStar className="text-xs text-[#FFC000]" />
          <FaStar className="text-xs text-[#FFC000]" />
          <FaStar className="text-xs text-[#FFC000]" />
        </div>

        <p className="text-xs text-[#555555]">(54)</p>
      </div>

      <div className="flex mt-3 items-center gap-3">
        <p className="text-[#FF2E00] font-bold text-sm">
          {formatPrice(data.price)}đ
        </p>

        <p className="text-xs text-[#555555]">$129.99</p>

        <p className="font-semibold text-xs text-[#FF2E00]">-40%</p>
      </div>
    </div>
  );
};

export default ProductItem;
