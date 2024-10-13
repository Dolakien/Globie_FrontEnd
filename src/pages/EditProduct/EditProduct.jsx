import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import categoryApi from "../../api/categoryApi";
import { useForm } from "react-hook-form";
import productApi from "../../api/productApi";
import { message, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { register, handleSubmit, reset } = useForm();

  const [fileList, setFileList] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

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

  useEffect(() => {
    if (data) {
      reset({
        productCategoryId: data.productCategory.productCategoryId,
        brand: data.brand,
        origin: data.origin,
        warranty: data.warranty,
        price: data.price,
        quantity: data.quantity,
        productName: data.productName,
        description: data.description,
      });
    }
  }, [data]);

  const { data: categories } = useQuery({
    queryKey: ["CATEGORIES"],
    queryFn: async () => {
      const res = await categoryApi.getAllCategory();

      return res.data.data;
    },
  });

  const { mutate: onUpdateProduct } = useMutation({
    mutationKey: ["UPDATE_PRODUCT"],
    mutationFn: async ({ productId, data: formValues }) => {
      const res = await productApi.updateProduct(productId, formValues);

      if (fileList?.length > 0) {
        const formData = new FormData();
        Array.from(fileList).forEach((file) => formData.append("files", file));
        await productApi.uploadImages(res.data.data.productId, formData);

        // delete old image
        await Promise.all(
          data.images.map((it) =>
            productApi.deleteProductImage(it.productImageCode)
          )
        );
      }

      return res;
    },
    onSuccess: () => {
      message.success("Update product successfully");
      navigate(-1);
    },
    onError: () => {
      message.error("An error occurred, please try again");
    },
  });

  const onFileChange = (e) => {
    const files = e.target.files;
    setFileList(files);
  };

  const previewImages = useMemo(() => {
    if (!fileList?.length) {
      const imageUrls = data?.images?.map((it) => it.imagePath);

      return imageUrls ?? [];
    }

    return Array.from(fileList).map((it) => URL.createObjectURL(it));
  }, [fileList, data]);

  const onSubmit = (values) => {
    onUpdateProduct({ productId: id, data: values });
  };

  if (isFetching) {
    return <Spin />;
  }

  return (
    <>
      <div className="py-10 container mx-auto px-3">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-4">
            <p className="mb-3 font-semibold text-lg">
              Product Image and Video
            </p>
            <label
              for="file"
              className="flex items-center justify-center rounded border border-[#434343] py-8 cursor-pointer"
            >
              <img src="/images/camera.png" alt="Camera icon" />
            </label>

            <input
              type="file"
              name=""
              id="file"
              hidden
              onChange={onFileChange}
              multiple
            />

            <div className="mt-4 flex gap-2 flex-wrap">
              {previewImages?.map((url, index) => (
                <img
                  alt="Preview"
                  src={url}
                  key={index}
                  className="block w-36 h-36 object-cover"
                />
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="col-span-8">
            <div className="border cursor-pointer border-[#434343] px-4 py-3 rounded-md mt-10 flex items-center justify-between">
              <div>
                <p className="text-[#9D9D9D] font-semibold mb-1">
                  Product Listing Categories
                </p>

                <select
                  {...register("productCategoryId", {
                    required: "Vui lòng chọn danh mục SP",
                  })}
                  id=""
                  className="outline-none"
                >
                  <option value="">Select category</option>
                  {categories?.map((it) => (
                    <option
                      key={it.productCategoryId}
                      value={it.productCategoryId}
                    >
                      {it.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              {/* <FaCaretDown className="text-3xl" /> */}
            </div>

            <div className="mt-6">
              <p className="font-semibold text-2xl">Detailed Information</p>

              <div className="flex flex-col gap-y-2 mt-2">
                <input
                  type="text"
                  className="h-10 outline-none px-3 border border-[#434343] rounded-md w-full placeholder:text-[#555555]"
                  placeholder="Brand"
                  {...register("brand", {
                    required: true,
                  })}
                />
                <input
                  type="text"
                  className="h-10 outline-none px-3 border border-[#434343] rounded-md w-full placeholder:text-[#555555]"
                  placeholder="Origin"
                  {...register("origin", {
                    required: true,
                  })}
                />
                <input
                  type="text"
                  className="h-10 outline-none px-3 border border-[#434343] rounded-md w-full placeholder:text-[#555555]"
                  placeholder="Warranty Policy"
                  {...register("warranty", {
                    required: true,
                  })}
                />
                <input
                  type="number"
                  className="h-10 outline-none px-3 border border-[#434343] rounded-md w-full placeholder:text-[#555555]"
                  placeholder="Price"
                  {...register("price", {
                    required: true,
                  })}
                />
                <input
                  type="number"
                  className="h-10 outline-none px-3 border border-[#434343] rounded-md w-full placeholder:text-[#555555]"
                  placeholder="Quantity"
                  {...register("quantity", {
                    required: true,
                  })}
                />
              </div>
            </div>

            <div className="mt-6">
              <p className="font-semibold text-2xl">
                Product Title and Description
              </p>

              <div className="flex flex-col gap-y-2 mt-2">
                <input
                  type="text"
                  className="h-10 outline-none px-3 border border-[#434343] rounded-md w-full placeholder:text-[#555555]"
                  placeholder="Name"
                  {...register("productName", {
                    required: true,
                  })}
                />

                <textarea
                  {...register("description", {
                    required: true,
                  })}
                  id=""
                  className="outline-none p-3 border border-[#434343] rounded-md w-full placeholder:text-[#555555]"
                  placeholder="Description"
                  rows={6}
                ></textarea>
              </div>
            </div>

            {/* <div className="mt-6">
              <p className="font-semibold text-2xl">Seller Information</p>

              <div className="flex gap-3 my-3">
                <p className="h-10 rounded-[32px] bg-[#D9D9D9] flex items-center px-4 text-sm cursor-pointer">
                  Personal
                </p>
                <p className="h-10 rounded-[32px] bg-[#D9D9D9] flex items-center px-4 text-sm cursor-pointer">
                  Store
                </p>
              </div>

              <input
                type="text"
                className="h-10 outline-none px-3 border border-[#434343] rounded-md w-full placeholder:text-[#555555]"
                placeholder="Address"
              />
            </div> */}

            <div className="text-right mt-6">
              <button className="inline-flex ml-auto items-center bg-orange-500 rounded-md p-3 gap-x-2 text-white text-sm font-semibold">
                <p>UPDATE PRODUCT</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
