import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProductItem from "../../components/ProductItem/ProductItem";

const NewProductPosting = () => {
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
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </div>
    </div>
  );
};

export default NewProductPosting;
