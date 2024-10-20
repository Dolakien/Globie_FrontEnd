import React from "react";
import { IoShieldCheckmark } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import {
  FaArrowRightArrowLeft,
  FaArrowsRotate,
  FaRegMessage,
} from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

const StoreTab = ({ data: { user: store } }) => {
  return (
    <div className="py-12 grid grid-cols-12 gap-6 items-center">
      <div className="col-span-7">
        <div className="flex items-center gap-5">
          <img
            src={store.avatar ?? "/images/store.png"}
            alt="Store avatar"
            className="w-[200px] h-[200px] rounded-full object-cover border"
          />

          <div>
            <p className="font-semibold text-2xl">{store.fullName}</p>
            <div className="flex items-center gap-x-1 my-3">
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
            </div>

            <div className="flex items-center gap-x-2">
              <p className="w-2 h-2 bg-green-500 rounded-full"></p>
              <p className="text-sm text-gray-500">Online 1 hour ago</p>
            </div>
          </div>
        </div>

        <div className="flex gap-1 mt-4">

          <p className="px-4 min-w-56 h-12 cursor-pointer bg-[#FF7A00] text-white text-lg font-medium rounded-md flex items-center justify-center">
            View store
          </p>
        </div>
      </div>

      <div className="col-span-5">
        <p className="font-semibold text-lg">Store policy</p>

        <ul className="mt-4">
          <li className="flex items-center gap-x-2 mb-3">
            <IoShieldCheckmark />

            <p>Warranty 01 - 03 - 06 - 12 months hardware</p>
          </li>
          <li className="flex items-center gap-x-2 mb-3">
            <FaArrowsRotate />

            <p>Returns 1 for 1 within 15 days</p>
          </li>
          <li className="flex items-center gap-x-2 mb-3">
            <MdOutlinePayment />

            <p>Online Installment And HD Bank</p>
          </li>
          <li className="flex items-center gap-x-2 mb-3">
            <FaArrowRightArrowLeft />

            <p>Subsidize the price of old revenue to upgrade the machine</p>
          </li>
        </ul>

        <hr />

        <div className="h-11 p-3 bg-green-500 rounded-md my-4 flex items-center gap-3 text-white font-medium w-[70%] cursor-pointer">
          <IoIosCall className="text-xl" />
          <p className="font-semibold">0983******</p>
          <p className="font-semibold uppercase ml-auto">
            Click to show number
          </p>
        </div>

        <hr />

        <div className="flex items-center justify-between mt-4">
          <FaRegMessage className="text-xl" />

          <p className="font-semibold uppercase text-green-500">
            Chat with seller
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoreTab;
