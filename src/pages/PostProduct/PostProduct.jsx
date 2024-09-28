import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import CategoriesListModal from "./CategoriesListModal";

const PostProduct = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const onVisible = () => setModalOpen(!modalOpen);

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

            <input type="file" name="" id="file" hidden />
          </div>

          <div className="col-span-8">
            <div
              onClick={onVisible}
              className="border cursor-pointer border-[#434343] px-4 py-3 rounded-md mt-10 flex items-center justify-between"
            >
              <div>
                <p className="text-[#9D9D9D] font-semibold mb-1">
                  Product Listing Categories
                </p>

                <p className="font-medium">Motherboard</p>
              </div>

              <FaCaretDown className="text-3xl" />
            </div>

            <div className="mt-6">
              <p className="font-semibold text-2xl">Detailed Information</p>

              <div className="flex flex-col gap-y-2 mt-2">
                <input
                  type="text"
                  className="h-10 outline-none px-3 border border-[#434343] rounded-md w-full placeholder:text-[#555555]"
                  placeholder="Condition"
                />
                <input
                  type="text"
                  className="h-10 outline-none px-3 border border-[#434343] rounded-md w-full placeholder:text-[#555555]"
                  placeholder="Brand"
                />
                <input
                  type="text"
                  className="h-10 outline-none px-3 border border-[#434343] rounded-md w-full placeholder:text-[#555555]"
                  placeholder="Color"
                />
                <input
                  type="text"
                  className="h-10 outline-none px-3 border border-[#434343] rounded-md w-full placeholder:text-[#555555]"
                  placeholder="Design"
                />
                <input
                  type="text"
                  className="h-10 outline-none px-3 border border-[#434343] rounded-md w-full placeholder:text-[#555555]"
                  placeholder="Warranty Policy"
                />
                <input
                  type="text"
                  className="h-10 outline-none px-3 border border-[#434343] rounded-md w-full placeholder:text-[#555555]"
                  placeholder="Price"
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
                  placeholder="Title"
                />

                <textarea
                  name=""
                  id=""
                  className="outline-none p-3 border border-[#434343] rounded-md w-full placeholder:text-[#555555]"
                  placeholder="Description"
                  rows={6}
                ></textarea>
              </div>
            </div>

            <div className="mt-6">
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
            </div>

            <div className="text-right mt-6">
              <button className="inline-flex ml-auto items-center bg-orange-500 rounded-md p-3 gap-x-2 text-white text-sm font-semibold">
                <p>POST PRODUCT</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <CategoriesListModal open={modalOpen} onClose={onVisible} />
    </>
  );
};

export default PostProduct;
