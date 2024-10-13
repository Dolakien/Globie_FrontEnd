import React from "react";
import { FaAngleRight, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const FlashSaleCard = () => {
  return (
    <div className="col-span-3 shadow-[0px_0px_12px_0px_#0000001A] rounded-lg px-3 py-4 text-center">
      <p className="text-[#9D9D9D] font-bold">Deal of the Day</p>

      <div className="flex gap-2 justify-center mt-2">
        <div>
          <p className="text-lg font-bold text-[#262626]">12</p>
          <p className="text-xs text-[#9D9D9D]">hour</p>
        </div>

        <div>
          <p>&#65072;</p>
        </div>

        <div>
          <p className="text-lg font-bold text-[#262626]">42</p>
          <p className="text-xs text-[#9D9D9D]">min</p>
        </div>

        <div>
          <p>&#65072;</p>
        </div>

        <div>
          <p className="text-lg font-bold text-[#262626]">12</p>
          <p className="text-xs text-[#9D9D9D]">sec</p>
        </div>
      </div>

      <div className="p-3">
        <img
          src="/images/product-image.jpeg"
          alt="Product img"
          className="block object-cover w-full h-32"
        />
      </div>

      <Link className="font-bold text-[#262626]">Nvidia RTX 4070</Link>

      <p className="my-2 text-[#555555] text-xs">VGA</p>

      <div className="flex items-center justify-center gap-1">
        <div className="flex items-center">
          <FaStar className="text-xs text-[#FFC000]" />
          <FaStar className="text-xs text-[#FFC000]" />
          <FaStar className="text-xs text-[#FFC000]" />
          <FaStar className="text-xs text-[#FFC000]" />
          <FaStar className="text-xs text-[#FFC000]" />
        </div>

        <p className="text-xs text-[#555555]">(54)</p>
      </div>

      <div className="flex mt-3 items-center justify-center gap-2">
        <p className="text-[#FF2E00] font-bold text-sm">$69.99</p>

        <p className="text-xs text-[#555555]">$129.99</p>

        <p className="font-semibold text-xs px-2 py-1 rounded bg-[#FF2E00] text-white">
          -40%
        </p>
      </div>
    </div>
  );
};

const FlashSale = () => {
  return (
    <div className="container px-3 mx-auto my-12">
      <div className="flex items-center justify-between">
        <p className="text-[28px] font-medium">Flash Sales</p>

        <Link className="flex items-center gap-1">
          <p className="text-[#262626] text-xs">View all</p>

          <FaAngleRight className="text-xs" />
        </Link>
      </div>

      <div className="mt-3 grid grid-cols-12 gap-4">
        <FlashSaleCard />
        <FlashSaleCard />
        <FlashSaleCard />
        <FlashSaleCard />
      </div>
    </div>
  );
};

export default FlashSale;
