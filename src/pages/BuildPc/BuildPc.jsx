import React, { useState } from "react";
import { FaCartArrowDown, FaPlus } from "react-icons/fa";
import classNames from "classnames";
import ChooseComponentModal from "./ChooseComponentModal";
import ContactForm from "../../components/ContactForm/ContactForm";
import { useQuery } from "@tanstack/react-query";
import categoryApi from "../../api/categoryApi";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../store/cartSlice"; // Import the action to add product to cart
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const TableRow = ({ index, data, isOdd, onChoose }) => {
  return (
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
  );
};

const BuildPc = () => {
  const dispatch = useDispatch(); // Initialize the dispatch function
  const navigate = useNavigate(); // Initialize navigate function from react-router-dom
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  const [selectedProducts, setSelectedProducts] = useState([]);

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

  // Function to add a product to the list
  const addProductToList = (product) => {
    const category = categories.find(cat => cat.productCategoryId === selectedCategoryId);
    const productWithCategory = {
      ...product,
      categoryName: category ? category.categoryName : "Unknown Category",
    };
    setSelectedProducts((prevProducts) => [...prevProducts, productWithCategory]);
  };

  // New function to add selected products to the cart
  const onAddToCart = () => {
    selectedProducts.forEach(product => {
      dispatch(addProductToCart({
        amount: 1, // Set default quantity to 1
        productId: product.productId, // Ensure productId is present
        image: product.image, // Make sure you have an image property
        name: product.productName,
        price: product.price, // Ensure you have a price property
      }));
    });

    setSelectedProducts([]); // Clear selected products after adding to cart

    // Navigate to the cart page
    navigate("/cart");
  };

  return (
    <>
      <div className="container px-3 mx-auto my-12">
        <h2 className="font-semibold uppercase text-[#2D3877] text-2xl">
          Choosing Components for Building a PC Configuration
        </h2>

        {/* Display selected products */}
        <div className="my-4">
  <h3 className="text-lg font-semibold">Selected Products:</h3>
  <ul className="mt-2"> {/* Tạo khoảng cách giữa tiêu đề và danh sách */}
    {selectedProducts.map((product, index) => (
      <li key={index} className="text-sm">
        <span className="font-bold text-sm">{index + 1}. {product.categoryName}:</span> {/* Giảm size categoryName */}
        {product.productName}
      </li>
    ))}
  </ul>
</div>


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

        <button
          onClick={onAddToCart} // Add onClick event to handle adding products to the cart
          className="ml-auto flex items-center h-10 bg-[#2D3877] rounded-md px-4 text-white font-medium gap-x-3 cursor-pointer"
        >
          <p>Add to cart</p>
          <FaCartArrowDown />
        </button>

        <ContactForm />
      </div>

      <ChooseComponentModal
        open={modalOpen}
        onClose={onVisible}
        categoryId={selectedCategoryId}
        onProductSelect={addProductToList}
      />
    </>
  );
};

export default BuildPc;
