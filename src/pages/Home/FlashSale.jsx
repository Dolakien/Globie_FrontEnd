import React from "react";
import { FaAngleRight, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const FlashSaleCard = ({ imageSrc, title, category, rating, price, originalPrice, discount }) => {
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
          src={imageSrc}
          alt="Product img"
          className="block object-cover w-full h-32"
        />
      </div>

      <Link className="font-bold text-[#262626]">{title}</Link>

      <p className="my-2 text-[#555555] text-xs">{category}</p>

      <div className="flex items-center justify-center gap-1">
        <div className="flex items-center">
          {Array.from({ length: 5 }, (_, index) => (
            <FaStar key={index} className="text-xs text-[#FFC000]" />
          ))}
        </div>

        <p className="text-xs text-[#555555]">({rating})</p>
      </div>

      <div className="flex mt-3 items-center justify-center gap-2">
        <p className="text-[#FF2E00] font-bold text-sm">${price}</p>

        <p className="text-xs text-[#555555]">${originalPrice}</p>

        <p className="font-semibold text-xs px-2 py-1 rounded bg-[#FF2E00] text-white">
          -{discount}%
        </p>
      </div>
    </div>
  );
};

const FlashSale = () => {
  const products = [
    {
      imageSrc: "https://c4.wallpaperflare.com/wallpaper/57/884/917/technology-nvidia-nvidia-geforce-rtx-2080-ti-wallpaper-preview.jpg",
      title: "Nvidia RTX 4070",
      category: "VGA",
      rating: 54,
      price: "69.99",
      originalPrice: "129.99",
      discount: 40,
    },
    {
      imageSrc: "https://cdn.cs.1worldsync.com/b9/78/b9784669-7a5c-4194-b27d-c5311494d786.jpg",
      title: "AMD Ryzen 7 5800X",
      category: "CPU",
      rating: 43,
      price: "299.99",
      originalPrice: "399.99",
      discount: 25,
    },
    {
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1k8VI7kZF5hbTbOkvkdmC9iLiVMXtmVS08A&s",
      title: "Samsung 970 EVO Plus",
      category: "SSD",
      rating: 60,
      price: "99.99",
      originalPrice: "149.99",
      discount: 33,
    },
    {
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5Ec_Yh1lJvkJgauhokJelFgbDE7zojf80nw&s",
      title: "Corsair Vengeance LPX",
      category: "RAM",
      rating: 27,
      price: "89.99",
      originalPrice: "129.99",
      discount: 31,
    },
  ];

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
        {products.map((product, index) => (
          <FlashSaleCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default FlashSale;
