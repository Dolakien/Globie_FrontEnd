import React from "react";
import Modal from "../../components/Modal/Modal";

const ProductSearchItem = () => {
  return (
    <div className="py-3 [&:not(:last-child)]:border-b border-dashed flex items-center gap-3">
      <div className="w-24 h-24 rounded-lg border">
        <img
          src="/images/product-1.png"
          alt="Product"
          className="block w-full h-full object-cover"
        />
      </div>

      <div className="text-sm">
        <p>Mainboard ASUS PRIME A320M-K</p>
        <p>SKY: 8888</p>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <p className="font-semibold">1.899.999đ</p>

        <button className="px-3 py-0.5 rounded border border-[#434343] text-[#434343] text-sm cursor-pointer font-medium">
          Buy
        </button>
      </div>
    </div>
  );
};

const ChooseComponentModal = ({ open, onClose }) => {
  return (
    <Modal title="Filter" open={open} onClose={onClose}>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-4 border border-[#434343] rounded py-4 text-center">
          <select name="" id="" className="outline-none uppercase">
            <option value="">BRANDS</option>
          </select>
        </div>

        <div className="col-span-4 border border-[#434343] rounded py-4 text-center">
          <select name="" id="" className="outline-none uppercase">
            <option value="">SERIES</option>
          </select>
        </div>

        <div className="col-span-4 border border-[#434343] rounded py-4 text-center">
          <select name="" id="" className="outline-none uppercase">
            <option value="">DEMAND</option>
          </select>
        </div>

        <div className="col-span-4 border border-[#434343] rounded py-4 text-center">
          <select name="" id="" className="outline-none uppercase">
            <option value="">motherboard</option>
          </select>
        </div>

        <div className="col-span-4 border border-[#434343] rounded py-4 text-center">
          <select name="" id="" className="outline-none uppercase">
            <option value="">chipset</option>
          </select>
        </div>

        <div className="col-span-4 border border-[#434343] rounded py-4 text-center">
          <select name="" id="" className="outline-none uppercase">
            <option value="">socket</option>
          </select>
        </div>
      </div>

      <div className="p-3 rounded-2xl border border-[#434343] mt-4">
        <input
          type="text"
          placeholder="Search product"
          className="outline-none w-full"
        />
      </div>

      <div className="mt-4">
        <ProductSearchItem />
        <ProductSearchItem />
        <ProductSearchItem />
        <ProductSearchItem />
      </div>
    </Modal>
  );
};

export default ChooseComponentModal;
