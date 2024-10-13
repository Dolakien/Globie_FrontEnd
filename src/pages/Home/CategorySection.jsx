import React from "react";
import { Link } from "react-router-dom";

const CategorySection = () => {
  return (
    <div className="container mx-auto px-3 mb-12">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-6 flex">
          <div className="w-1/2 bg-[#BF2E3B] px-3 py-24 flex justify-center flex-col">
            <p className="font-bold text-3xl text-white leading-normal">
              Build a performance PC
            </p>

            <p className="mt-4 text-white">Having everything you need</p>

            <Link className="mt-6 underline text-white">
              Explore all category
            </Link>
          </div>
          <div className="w-1/2">
            <img
              src="/images/category-section-1.jpeg"
              alt="Category img"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="col-span-6 flex">
          <div className="w-1/2 bg-[#1D5159] px-3 py-24 flex justify-center flex-col">
            <p className="font-bold text-3xl text-white leading-normal">
              The famous motherboard brands
            </p>

            <p className="mt-4 text-white">Get in Globie</p>

            <Link className="mt-6 underline text-white">
              Explore all category
            </Link>
          </div>
          <div className="w-1/2">
            <img
              src="/images/category-section-2.png"
              alt="Category img"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
