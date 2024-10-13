import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const HighPerformanceItem = () => {
  return (
    <div className="col-span-4">
      <div className="relative pt-[85%] rounded-t-lg overflow-hidden">
        <img
          src="/images/card-do-hoa.png"
          alt="Img"
          className="block absolute top-0 right-0 bottom-0 left-0 object-cover w-full h-full"
        />
      </div>

      <div className="rounded-b-lg flex items-center justify-between bg-[#262626] p-5 text-white gap-3">
        <div className="flex-1">
          <p className="font-bold">Asus TUF Gaming RTX 4080</p>
          <p className="text-sm text-[#C4C4C4] mt-2">VGA</p>
        </div>

        <Link className="flex items-center rounded-lg border border-[#D9D9D9] px-3 py-3 gap-2">
          <p>$89</p>
          <p>Shop Now</p>
        </Link>
      </div>
    </div>
  );
};

const HighPerformance = () => {
  return (
    <div className="container px-3 mx-auto mb-12">
      <div className="flex items-center justify-between">
        <p className="text-[28px] font-medium">High Performance</p>

        <Link className="flex items-center gap-1">
          <p className="text-[#262626] text-xs">View all</p>

          <FaAngleRight className="text-xs" />
        </Link>
      </div>

      <div className="grid grid-cols-12 gap-3 mt-4">
        <HighPerformanceItem />
        <HighPerformanceItem />
        <HighPerformanceItem />
      </div>
    </div>
  );
};

export default HighPerformance;
