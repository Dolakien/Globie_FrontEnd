import React from "react";
import Banner from "./Banner";
import { Link } from "react-router-dom";
import FlashSale from "./FlashSale";
import HighPerformance from "./HighPerformance";
import NewProductPosting from "./NewProductPosting";
import CategorySection from "./CategorySection";
import HomeSlider from "./HomeSlider";
import ContactForm from "../../components/ContactForm/ContactForm";

const Home = () => {
  return (
    <>
      <div className="container px-3 mx-auto">
        <div className="flex flex-wrap gap-3">
          <Link className="text-sm text-[#555555] m-3">Motherboard</Link>
          <Link className="text-sm text-[#555555] m-3">Motherboard</Link>
          <Link className="text-sm text-[#555555] m-3">Motherboard</Link>
          <Link className="text-sm text-[#555555] m-3">Motherboard</Link>
          <Link className="text-sm text-[#555555] m-3">Motherboard</Link>
          <Link className="text-sm text-[#555555] m-3">Motherboard</Link>
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
