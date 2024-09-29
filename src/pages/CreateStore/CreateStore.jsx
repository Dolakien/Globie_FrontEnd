import React from "react";
import { FaAngleRight, FaCamera } from "react-icons/fa";
import { Link } from "react-router-dom";

const CreateStore = () => {
  return (
    <div className="container mx-auto px-2 mb-10">
      <div className="flex gap-x-2 text-[#555555] items-center mt-12">
        <Link>Homepage</Link>
        <FaAngleRight />
        <Link>Store</Link>
        <FaAngleRight />
        <Link>Create store</Link>
      </div>

      <div className="relative pt-[35%] mt-4">
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
          src="/images/avatar-default.jpg"
          alt="Avatar"
          className="w-full h-full object-cover border-2 border-white rounded-full"
        />

        <div className="absolute w-full h-full bg-black bg-opacity-35 top-0 right-0 bottom-0 left-0 opacity-0 group-hover:opacity-100 transition-all rounded-full"></div>
        <div className="absolute w-full h-full top-0 right-0 bottom-0 left-0 opacity-0 group-hover:opacity-100 transition-all rounded-full flex items-center justify-center">
          <FaCamera className="text-white text-3xl cursor-pointer" />
        </div>
      </div>

      <form action="" className="-mt-24">
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
              name=""
              id=""
              className="p-3 border rounded border-[#555555] w-full outline-none"
              placeholder="Store description"
              rows={6}
            ></textarea>
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          <label htmlFor="" className="font-semibold w-1/3">
            Store website
            <span className="text-red-500"> *</span>
          </label>

          <div className="flex-1">
            <input
              type="text"
              placeholder="Enter store website"
              className="p-3 border rounded border-[#555555] w-full outline-none"
            />
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
            />

            <input
              type="text"
              placeholder="Secondary phone number 1 (If any)"
              className="p-3 border rounded border-[#555555] w-full outline-none mt-2"
            />
            <input
              type="text"
              placeholder="Secondary phone number 2 (If any)"
              className="p-3 border rounded border-[#555555] w-full outline-none mt-2"
            />
          </div>
        </div>

        <div className="mt-10 flex items-center gap-3">
          <button className="h-11 px-3 rounded border font-medium border-[#555] text-[#555] cursor-pointer">
            Preview the interface
          </button>

          <button className="h-11 px-3 rounded bg-orange-500 text-white font-medium cursor-pointer">
            Save and checkout
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateStore;
