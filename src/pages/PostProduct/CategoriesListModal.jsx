import React from "react";
import Modal from "../../components/Modal/Modal";
import { FaAngleRight } from "react-icons/fa6";

const CategoriesListModal = ({ open, onClose }) => {
  return (
    <Modal title="Post Product" open={open} onClose={onClose}>
      <p className="text-[#7B7B7B] font-medium mb-2">Choose Category</p>

      <div className="flex flex-col gap-y-3">
        <div className="rounded-md h-10 px-3 border-[#555555] border flex items-center justify-between">
          <p className="uppercase">CPU</p>

          <FaAngleRight />
        </div>
        <div className="rounded-md h-10 px-3 border-[#555555] border flex items-center justify-between">
          <p className="uppercase">CPU</p>

          <FaAngleRight />
        </div>
        <div className="rounded-md h-10 px-3 border-[#555555] border flex items-center justify-between">
          <p>Motherboard</p>

          <FaAngleRight />
        </div>
        <div className="rounded-md h-10 px-3 border-[#555555] border flex items-center justify-between">
          <p className="uppercase">VGA</p>

          <FaAngleRight />
        </div>
        <div className="rounded-md h-10 px-3 border-[#555555] border flex items-center justify-between">
          <p className="uppercase">RAM</p>

          <FaAngleRight />
        </div>
        <div className="rounded-md h-10 px-3 border-[#555555] border flex items-center justify-between">
          <p className="uppercase">PSU</p>

          <FaAngleRight />
        </div>
        <div className="rounded-md h-10 px-3 border-[#555555] border flex items-center justify-between">
          <p className="uppercase">HDD & SSD</p>

          <FaAngleRight />
        </div>
        <div className="rounded-md h-10 px-3 border-[#555555] border flex items-center justify-between">
          <p className="uppercase">CASE</p>

          <FaAngleRight />
        </div>
      </div>
    </Modal>
  );
};

export default CategoriesListModal;
