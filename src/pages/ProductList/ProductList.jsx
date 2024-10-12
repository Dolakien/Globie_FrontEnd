import { Breadcrumb, Tabs } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import ProductItem from "../../components/ProductItem/ProductItem";

const ProductList = () => {
  return (
    <>
      <div className="container px-3 mx-auto my-8">
        <Breadcrumb
          items={[
            {
              title: <Link>Homepage</Link>,
            },
            {
              title: "Motherboard",
            },
          ]}
        />
      </div>

      <div className="bg-[#E9E9E9]">
        <div className="container mx-auto px-3 py-6 flex items-center justify-between">
          <p className="flex items-center gap-x-4">
            <span className="font-bold text-xl text-[#262626]">
              Motherboard
            </span>

            <span className="text-[#555555]">100 items</span>
          </p>

          <select
            name=""
            id=""
            className="rounded px-3 py-2 bg-transparent border border-[#7B7B7B] text-sm text-[#555555]"
          >
            <option value="">Sort by order</option>
          </select>
        </div>
      </div>

      <div className="container mx-auto px-3 py-10">
        <div className="flex items-center gap-6">
          <p className="font-bold text-[#FF7A00] border-b-2 border-[#FF7A00]">
            All
          </p>
          <p className="font-bold text-[#7B7B7B] border-b-2 border-b-transparent">
            Personal
          </p>
          <p className="font-bold text-[#7B7B7B] border-b-2 border-b-transparent">
            Store
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6 mt-8">
          <ProductItem className="col-span-4" />
          <ProductItem className="col-span-4" />
          <ProductItem className="col-span-4" />
          <ProductItem className="col-span-4" />
          <ProductItem className="col-span-4" />
          <ProductItem className="col-span-4" />
        </div>
      </div>
    </>
  );
};

export default ProductList;
