import React from "react";
import { FaMinus, FaPlus, FaRegTrashAlt } from "react-icons/fa";

const CartRow = () => {
  return (
    <tr>
      <td className="py-3">
        <div className="flex items-center gap-3">
          <img
            src="https://picsum.photos/300/3300"
            alt="Product img"
            className="rounded-lg border border-[#D9D9D9] object-cover w-20 h-20"
          />

          <p className="text-[#262626] font-bold">Logitech</p>
        </div>
      </td>

      <td className="text-[#555555]">$25.99</td>

      <td>
        <div className="border rounded inline-flex">
          <FaMinus className="m-3" />
          <input
            type="text"
            className="w-12 text-center outline-none"
            value={1}
          />
          <FaPlus className="m-3" />
        </div>
      </td>

      <td className="text-[#555555]">$25.99</td>

      <td>
        <FaRegTrashAlt className="text-[#7B7B7B] cursor-pointer" />
      </td>
    </tr>
  );
};

const Cart = () => {
  return (
    <div className="container mx-auto px-3 my-12">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <p className="text-xl font-bold text-[#262626]">Cart</p>

          <table className="w-full mt-4">
            <tbody>
              <CartRow />
              <CartRow />
              <CartRow />
              <CartRow />
            </tbody>
          </table>
        </div>

        <div className="col-span-4">
          <div className="bg-[#E9E9E9] rounded-xl px-6 py-6">
            <p className="text-[#262626] font-bold mb-3">Order Summary</p>

            <div className="flex items-center justify-between mb-3">
              <p className="text-[#555555]">Price</p>
              <p className="text-[#262626]">$99.23</p>
            </div>

            <div className="flex items-center justify-between mb-3">
              <p className="text-[#555555]">Shipping</p>
              <p className="text-[#262626]">$99.23</p>
            </div>

            <div className="flex items-center justify-between mb-3">
              <p className="text-[#555555]">Tax</p>
              <p className="text-[#262626]">$99.23</p>
            </div>

            <div className="flex items-center justify-between mb-3 border-t border-t-[#D9D9D9] pt-3">
              <p className="text-[#262626] font-bold">Total Price</p>
              <p className="text-[#262626] font-bold">$99.23</p>
            </div>

            <button className="rounded-lg py-3 text-white uppercase bg-[#434343] w-full mt-4 cursor-pointer">
              Checkout
            </button>
          </div>

          <div className="mt-6 flex items-center h-12">
            <input
              type="text"
              className="flex-1 border-l border-y border-[#7B7B7B] outline-none h-full rounded-l-lg px-3 placeholder:text-sm"
              placeholder="Enter coupon code"
            />

            <button className="bg-[#262626] rounded-r-lg h-full px-4 text-white text-sm font-semibold">
              Apply code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
