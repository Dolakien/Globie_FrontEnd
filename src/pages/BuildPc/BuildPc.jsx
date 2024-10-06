import React, { useState } from "react";
import { IoSendOutline } from "react-icons/io5";
import { FaCartArrowDown, FaPlus } from "react-icons/fa";
import classNames from "classnames";
import ChooseComponentModal from "./ChooseComponentModal";

const COMPONENTS = [
  {
    name: "CPU",
  },
  {
    name: "Motherboard",
  },
  {
    name: "VGA",
  },
  {
    name: "RAM",
  },
  {
    name: "HDD",
  },
  {
    name: "SSD",
  },
  {
    name: "Power Supply",
  },
  {
    name: "Case",
  },
  {
    name: "CPU Cooler",
  },
  {
    name: "Fan",
  },
  {
    name: "Monitor",
  },
  {
    name: "Gear",
  },
];

const TableRow = ({ index, name, isOdd, onChoose }) => {
  return (
    <>
      <tr>
        <td
          className={classNames(
            "p-3 text-[#2D3877] font-semibold border-r-2 border-r-white",
            {
              "bg-gray-100": isOdd,
            }
          )}
        >
          {index}. {name}
        </td>

        <td
          className={classNames("p-3", {
            "bg-gray-100": isOdd,
          })}
        >
          <button
            onClick={onChoose}
            className="bg-[#2D3877] cursor-pointer flex items-center rounded-md h-10 px-3 gap-2 text-white font-medium"
          >
            <FaPlus className="text-sm" />
            <p className="font-medium text-sm uppercase">CHOOSE {name}</p>
          </button>
        </td>
      </tr>
    </>
  );
};

const BuildPc = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const onOpenModal = () => {
    setModalOpen(true);
  };

  const onVisible = () => setModalOpen(!modalOpen);

  return (
    <>
      <div className="container px-3 mx-auto my-12">
        <h2 className="font-semibold uppercase text-[#2D3877] text-2xl">
          Choosing Components for Building a PC Configuration
        </h2>

        <table className="w-full my-10">
          <tbody>
            {COMPONENTS.map((it, index) => (
              <TableRow
                index={index + 1}
                name={it.name}
                isOdd={index % 2 === 0}
                key={index}
                onChoose={onOpenModal}
              />
            ))}
          </tbody>
        </table>

        <button className="ml-auto flex items-center h-10 bg-[#2D3877] rounded-md px-4 text-white font-medium gap-x-3 cursor-pointer">
          <p>Add to cart</p>
          <FaCartArrowDown />
        </button>

        <div className="mx-auto bg-[#E5BB39] text-center rounded-md w-[576px] mt-10 p-8">
          <p className="font-semibold text-2xl">
            <span className="text-white">GLOBIE</span>
            <span className="text-[#9D9D9D]"> PLATFORM</span>
          </p>

          <p className="my-4 text-white">
            Register your email not to miss the last minutes off+ Free delivery
          </p>

          <div className="flex items-center mx-auto bg-white rounded-lg w-80 h-10">
            <input
              type="text"
              placeholder="Enter your email"
              className="bg-transparent flex-1 ml-4 outline-none"
            />

            <IoSendOutline className="mx-4" />
          </div>
        </div>
      </div>

      <ChooseComponentModal open={modalOpen} onClose={onVisible} />
    </>
  );
};

export default BuildPc;
