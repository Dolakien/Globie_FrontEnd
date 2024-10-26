import React from "react";
import { FaCamera } from "react-icons/fa";
import useProfile from "../../../hooks/useProfile";
import { useMutation, useQuery } from "@tanstack/react-query";
import memberApi from "../../../api/memberApi";
import PackageItem from "./PackageItem";
import { Controller, useForm } from "react-hook-form";
import paymentApi from "../../../api/paymentApi";
import { message } from "antd";

const CreateStore = () => {
  const { data } = useProfile();

  const { register, handleSubmit, control, setValue } = useForm();

  const { data: packages } = useQuery({
    queryKey: ["STORE_PACKAGE"],
    queryFn: async () => {
      const r = await memberApi.getAllMember();

      const data = r.data?.data ?? [];
      data.length > 0 && setValue("memberID", data[0].memberLevelId);

      return data;
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["CREATE_STORE"],
    mutationFn: (data) => paymentApi.createPayOsStoreUrl(data),
    onSuccess: (r) => {
      window.location.href = r.data.data.data.checkoutUrl;
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });

  return (
    <div className="px-6 mb-10 pt-6">
      <div className="relative pt-[35%]">
        <img
          src="/images/cover-default.jpg"
          alt="Cover"
          className="absolute w-full h-full top-0 right-0 bottom-0 left-0 object-cover rounded"
        />

        <div className="absolute bottom-3 right-3 flex items-center bg-white border rounded p-3 gap-x-2 cursor-pointer">
          <FaCamera className="text-xl" />
          <p className="text-sm font-medium">Change cover photo</p>
        </div>
      </div>

      <div className="w-[200px] h-[200px] rounded-full relative ml-6 -translate-y-[65%] group">
        <img
          src={data?.avatar || "/images/avatar-default.jpg"}
          alt="Avatar"
          className="w-full h-full object-cover border-2 border-white rounded-full"
        />
      </div>

      <form action="" className="-mt-24" onSubmit={handleSubmit(mutate)}>
        <div className="flex gap-3 mb-6">
          <label htmlFor="" className="font-semibold w-1/3">
            Name of the
            <span className="text-red-500"> *</span>
          </label>

          <div className="flex-1">
            <input
              type="text"
              placeholder="Enter store name"
              className="p-3 border rounded border-[#555555] w-full outline-none"
              {...register("storeName", {
                required: "Please enter store name",
              })}
            />

            <p className="mt-1 text-sm text-gray-500">
              Note: Store name cannot be change after activation
            </p>
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          <label htmlFor="" className="font-semibold w-1/3">
            Introducing the specialized page
            <span className="text-red-500"> *</span>
          </label>

          <div className="flex-1">
            <textarea
              {...register("description", {
                required: "Please enter store description",
              })}
              id=""
              className="p-3 border rounded border-[#555555] w-full outline-none"
              placeholder="Store description"
              rows={6}
            ></textarea>
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          <label htmlFor="" className="font-semibold w-1/3">
            Store address
            <span className="text-red-500"> *</span>
          </label>

          <div className="flex-1">
            <input
              type="text"
              placeholder="Enter the store address"
              className="p-3 border rounded border-[#555555] w-full outline-none"
              {...register("storeAddress", {
                required: "Please enter store address",
              })}
            />
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          <label htmlFor="" className="font-semibold w-1/3">
            Contact phone
            <span className="text-red-500"> *</span>
          </label>

          <div className="flex-1">
            <input
              type="text"
              placeholder="Enter phone number"
              className="p-3 border rounded border-[#555555] w-full outline-none"
              {...register("storePhone", {
                required: "Please enter store phone",
                pattern: {
                  value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                  message: "Phone invalid",
                },
              })}
            />
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          <label htmlFor="" className="font-semibold w-1/3">
            Package
            <span className="text-red-500"> *</span>
          </label>

          <div className="flex-1">
            <Controller
              control={control}
              name="memberID"
              render={({ field }) => (
                <div className="grid grid-cols-12 gap-3">
                  {packages?.map((it) => (
                    <PackageItem
                      value={field.value}
                      key={it.memberLevelId}
                      data={it}
                      onChange={field.onChange}
                    />
                  ))}
                </div>
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex items-center gap-3">
          <button className="h-11 px-3 rounded bg-orange-500 text-white font-medium cursor-pointer">
            Save and checkout
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateStore;
