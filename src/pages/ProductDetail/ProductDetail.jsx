import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaAngleRight, FaHeart, FaPlusCircle } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";

import { useQuery } from "@tanstack/react-query";
import productApi from "../../api/productApi";
import { formatPrice } from "../../utils/formatPrice";
import { message, Spin } from "antd";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../store/cartSlice";
import ProductDetailTab from "./ProductDetailTab";
import ProductRelated from "./ProductRelated";

const ProductDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const { data, isFetching } = useQuery({
    queryKey: ["PRODUCT_DETAIL", id],
    queryFn: async () => {
      const res = await productApi.getProductDetail(id);
      const productData = res.data.data;

      const productImage = await productApi.getImageByProductId(
        productData.productId
      );

      return {
        ...productData,
        images: productImage.data?.data || [],
      };
    },
  });

  const onIncreaseQnt = () => {
    const qnt = quantity + 1;
    if (qnt <= data.quantity) {
      setQuantity(qnt);
    }
  };

  const onDecreaseQnt = () => {
    const qnt = quantity - 1;
    qnt > 0 && setQuantity(qnt);
  };

  const onAddCart = () => {
    dispatch(
      addProductToCart({
        amount: quantity,
        productId: data.productId,
        image: data.images[0].imagePath,
        name: data.productName,
        price: data.price,
      })
    );

    setQuantity(1);
    message.success("Add product to cart success");
  };

  if (isFetching) {
    return <Spin />;
  }

  return (
    <div className="container px-3 mx-auto">
      <div className="flex gap-x-2 text-[#555555] items-center mt-12">
        <Link>Homepage</Link>
        <FaAngleRight />
        <Link>{data?.productCategory?.categoryName}</Link>
        <FaAngleRight />
        <Link>{data?.productName}</Link>
      </div>

      <div className="mt-10 grid grid-cols-12 gap-6 mb-6 items-center">
        <div className="col-span-6 flex">
          {data.images.length > 1 && (
            <div className="w-36 flex flex-col gap-y-2">
              {data.images.slice(1).map((it, index) => (
                <img
                  key={index}
                  src={it.imagePath}
                  alt="Product img"
                  className="block w-full"
                />
              ))}
            </div>
          )}

          <div className="flex-1 flex">
            <img
              src={data?.images?.[0]?.imagePath}
              alt="Product img"
              className="block object-contain my-auto"
            />
          </div>
        </div>

        <div className="col-span-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-xl"> {data?.productName}</h2>
              <p>{formatPrice(data?.price)}đ</p>
            </div>

            <div className="w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer">
              <FaHeart className="text-gray-400 text-xl" />
            </div>
          </div>

          <div className="mt-8 gap-5 flex items-center">
            <p>Shipping</p>

            <div>
              <select name="" id="" className="font-medium">
                <option value="">Free Shipping to Victoria teritory</option>
              </select>

              <p className="text-[#9D9D9D] text-sm">
                Delivery Time: 14–17 days
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 mt-5">
            <p>Quantity</p>

            <div className="border rounded flex">
              <FaMinus className="m-3 cursor-pointer" onClick={onDecreaseQnt} />
              <input
                type="text"
                className="w-12 text-center outline-none"
                value={quantity}
                readOnly
              />
              <FaPlus className="m-3 cursor-pointer" onClick={onIncreaseQnt} />
            </div>

            <p className="font-semibold text-[#555555] text-sm">
              {data.quantity} available
            </p>
          </div>

          <div className="mt-5 bg-[#E9E9E9] rounded p-8">
            <p className="text-lg text-[#262626] font-semibold pb-3 border-b border-b-[#C4C4C4]">
              $79.98
            </p>

            <div className="mt-4 flex items-center gap-3">
              <FaPlusCircle className="text-xl" />

              <p className="flex-1 text-sm">
                <strong>Add shipping insurance for $9 </strong>
                <span>
                  (declared value only if the package gets lost, stolen or
                  damaged.)
                </span>
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button className="w-1/2 h-14 rounded bg-[#4172DC] uppercase text-white">
              Shop now
            </button>
            <button
              onClick={onAddCart}
              className="w-1/2 h-14 rounded uppercase flex gap-x-2 items-center justify-center border border-[#434343] text-[#434343]"
            >
              <LuShoppingCart className="text-xl" />
              <p>Add to basket</p>
            </button>
          </div>
        </div>
      </div>

      <ProductDetailTab data={data} />

      <ProductRelated categoryId={data.productCategory.productCategoryId} />
    </div>
  );
};

export default ProductDetail;
