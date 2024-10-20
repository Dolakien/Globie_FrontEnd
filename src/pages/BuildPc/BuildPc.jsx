import React, { useState } from "react";
import { FaCartArrowDown, FaPlus } from "react-icons/fa";
import classNames from "classnames";
import ChooseComponentModal from "./ChooseComponentModal";
import ContactForm from "../../components/ContactForm/ContactForm";
import { useQuery } from "@tanstack/react-query";
import categoryApi from "../../api/categoryApi";

const TableRow = ({ index, data, isOdd, onChoose }) => {
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
          {index}. {data.categoryName}
        </td>

        <td
          className={classNames("p-3", {
            "bg-gray-100": isOdd,
          })}
        >
          <button
            onClick={() => onChoose(data.productCategoryId)}
            className="bg-[#2D3877] cursor-pointer flex items-center rounded-md h-10 px-3 gap-2 text-white font-medium"
          >
            <FaPlus className="text-sm" />
            <p className="font-medium text-sm uppercase">
              CHOOSE {data.categoryName}
            </p>
          </button>
        </td>
      </tr>
    </>
  );
};

const BuildPc = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState();

  const { data: categories } = useQuery({
    queryKey: ["CATEGORIES"],
    queryFn: async () => {
      const res = await categoryApi.getAllCategory();

      return res.data.data;
    },
  });

  const onOpenModal = (categoryId) => {
    setSelectedCategoryId(categoryId);
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
            {categories?.map((it, index) => (
              <TableRow
                index={index + 1}
                data={it}
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

        <ContactForm />
      </div>

      <ChooseComponentModal
        open={modalOpen}
        onClose={onVisible}
        categoryId={selectedCategoryId}
      />
    </>
  );
};

export default BuildPc;
