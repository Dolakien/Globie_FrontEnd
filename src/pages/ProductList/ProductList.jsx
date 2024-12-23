import { Breadcrumb, Empty, Spin } from "antd";
import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductItem from "../../components/ProductItem/ProductItem";
import { useQuery } from "@tanstack/react-query";
import productApi from "../../api/productApi";

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [selectedTab, setSelectedTab] = useState("All");

  const fetchProducts = async () => {
    let products = [];
    if (category) {
      if (selectedTab === "All") {
        const res = await productApi.getProductByCategory(category);
        products = res.data?.data ?? [];
      } else if (selectedTab === "Personal") {
        const res = await productApi.getProductUserByCategory(category);
        products = res.data?.data ?? [];
      } else if (selectedTab === "Store") {
        const res = await productApi.getProductStoreByCategory(category);
        products = res.data?.data ?? [];
      }
    } else {
      const res = await productApi.getAllSellingProduct();
      products = res.data?.data ?? [];
    }

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
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["PRODUCT_LIST", category, selectedTab],
    queryFn: fetchProducts,
  });

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    refetch();
  }, [selectedTab, category]);

  const renderTitle = () => {
    if (category && data?.length > 0) {
      return data[0].productCategory.categoryName;
    }
    return "Products List";
  };

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="container px-3 mx-auto my-8">
        <Breadcrumb
          items={[
            {
              title: <Link to="/">Homepage</Link>,
            },
            {
              title: renderTitle(),
            },
          ]}
        />
      </div>

      <div className="bg-[#E9E9E9]">
        <div className="container mx-auto px-3 py-6 flex items-center justify-between">
          <p className="flex items-center gap-x-4">
            <span className="font-bold text-xl text-[#262626]">
              {renderTitle()}
            </span>
            <span className="text-[#555555]">{data?.length ?? 0} items</span>
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
          <p
            className={`font-bold ${
              selectedTab === "All"
                ? "text-[#FF7A00] border-b-2 border-[#FF7A00]"
                : "text-[#7B7B7B] border-b-2 border-b-transparent"
            }`}
            onClick={() => handleTabChange("All")}
          >
            All
          </p>
          <p
            className={`font-bold ${
              selectedTab === "Personal"
                ? "text-[#FF7A00] border-b-2 border-[#FF7A00]"
                : "text-[#7B7B7B] border-b-2 border-b-transparent"
            }`}
            onClick={() => handleTabChange("Personal")}
          >
            Personal
          </p>
          <p
            className={`font-bold ${
              selectedTab === "Store"
                ? "text-[#FF7A00] border-b-2 border-[#FF7A00]"
                : "text-[#7B7B7B] border-b-2 border-b-transparent"
            }`}
            onClick={() => handleTabChange("Store")}
          >
            Store
          </p>
        </div>

        {data && data.length === 0 && <Empty className="my-12" />}
        {data?.length > 0 && (
          <div className="grid grid-cols-12 gap-6 mt-8">
            {data.map((it) => (
              <ProductItem key={it.productId} className="col-span-4" data={it} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductList;
