import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const HighPerformanceItem = ({ imageSrc, title, category, price }) => {
  return (
    <div className="col-span-4">
      <div className="relative pt-[85%] rounded-t-lg overflow-hidden">
        <img
          src={imageSrc}
          alt="Img"
          className="block absolute top-0 right-0 bottom-0 left-0 object-cover w-full h-full"
        />
      </div>

      <div className="rounded-b-lg flex items-center justify-between bg-[#262626] p-5 text-white gap-3">
        <div className="flex-1">
          <p className="font-bold">{title}</p>
          <p className="text-sm text-[#C4C4C4] mt-2">{category}</p>
        </div>

        <Link className="flex items-center rounded-lg border border-[#D9D9D9] px-3 py-3 gap-2">
          <p>${price}</p>
          <p>Shop Now</p>
        </Link>
      </div>
    </div>
  );
};

const HighPerformance = () => {
  const products = [
    {
      imageSrc: "/images/card-do-hoa.png",
      title: "Asus TUF Gaming RTX 4080",
      category: "VGA",
      price: "89",
    },
    {
      imageSrc: "https://storage-asset.msi.com/global/picture/news/2022/vga/3090ti-20220329-1.jpg",
      title: "MSI Gaming GeForce RTX 3090",
      category: "VGA",
      price: "799",
    },
    {
      imageSrc: "https://global.aorus.com/upload/Admin/images/AORUS%20GeForce%20RTX%203080%20XTREME%20MaxCoveredCooling%20(1).jpg",
      title: "Gigabyte GeForce RTX 3080",
      category: "VGA",
      price: "699",
    },
  ];

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
        {products.map((product, index) => (
          <HighPerformanceItem key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default HighPerformance;
