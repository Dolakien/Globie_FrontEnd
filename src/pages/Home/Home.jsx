import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import { Link } from "react-router-dom";
import FlashSale from "./FlashSale";
import HighPerformance from "./HighPerformance";
import NewProductPosting from "./NewProductPosting";
import CategorySection from "./CategorySection";
import HomeSlider from "./HomeSlider";
import ContactForm from "../../components/ContactForm/ContactForm";
import { message } from "antd";
import categoryApi from "../../api/categoryApi";

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await categoryApi.getAllCategory();
      setCategories(res.data?.data);
    } catch (error) {
      message.error("Failed to fetch categories");
    }
  };

  return (
    <>
      <div className="container px-3 mx-auto">
        <div className="flex flex-wrap gap-3">
          {categories.map((it) => (
            <Link
              key={it.productCategoryId}
              className="text-sm text-[#555555] font-medium m-3 hover:text-orange-500 transition-all"
              to={`/products/?category=${it.productCategoryId}`}
            >
              {it.categoryName}
            </Link>
          ))}
        </div>
      </div>

      <Banner />
      <FlashSale />
      <HighPerformance />
      <NewProductPosting />
      <CategorySection />
      <HomeSlider />
      <ContactForm className="mb-12" />
    </>
  );
};

export default Home;
