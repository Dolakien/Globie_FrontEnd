import classNames from "classnames";
import React, { useMemo } from "react";
import { FaHeart, FaRegEdit, FaRegHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";
import { useMutation, useQuery } from "@tanstack/react-query";
import bookmarkApi from "../../api/bookmarkApi";
import productApi from "../../api/productApi";
import { TOKEN_STORAGE_KEY } from "../../constants";
import { message } from "antd";

const ProductItem = ({ className, data, editable }) => {
  const isLogged = localStorage.getItem(TOKEN_STORAGE_KEY);

  const { data: productBookmark, refetch } = useQuery({
    queryKey: ["USER_BOOKMARK"],
    queryFn: async () => {
      const res = await bookmarkApi.getAllBookmark();

      const products = res.data?.data ?? [];

      const productImageMap = await Promise.all(
        products.map(async (it) => {
          const imageRes = await productApi.getImageByProductId(
            it.product.productId
          );

          return {
            ...it.product,
            images: imageRes.data?.data || [],
          };
        })
      );

      return productImageMap;
    },
    enabled: !!isLogged,
  });

  const { mutate: onAddBookmark } = useMutation({
    mutationKey: ["ADD_BOOKMARK"],
    mutationFn: (productId) => {
      return bookmarkApi.addProduct(productId);
    },
    onSuccess: refetch,
  });

  const { mutate: onRemoveBookmark } = useMutation({
    mutationKey: ["REMOVE_BOOKMARK"],
    mutationFn: (productId) => {
      return bookmarkApi.removeProduct(productId);
    },
    onSuccess: refetch,
  });

  const isBookmarked = useMemo(() => {
    return productBookmark?.some((x) => x.productId === data.productId);
  }, [productBookmark, data.productId]);

  const onToggleBookmark = () => {
    if (!isLogged) {
      return message.info("Pleas login to use this feature");
    }

    if (isBookmarked) {
      onRemoveBookmark(data.productId);
    } else {
      onAddBookmark(data.productId);
    }
  };

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

        <div className="cursor-pointer" onClick={onToggleBookmark}>
          {isBookmarked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </div>
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

      {editable && (
        <Link
          to={`/profile/my-products/${data.productId}/edit`}
          className="mt-3 flex justify-center bg-orange-500 rounded-lg py-2.5 text-white"
        >
          <FaRegEdit className="text-lg" />
        </Link>
      )}
    </div>
  );
};

export default ProductItem;
