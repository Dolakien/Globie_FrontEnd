import { Carousel } from "antd";
import React from "react";

const CarouselItem = () => {
  return (
    <div className="py-6 flex items-center justify-around">
      <div>
        <p className="text-[#465D6B] font-bold mb-2 text-2xl">MagSafe</p>
        <p className="font-medium text-[#555555]">
          Optimize Performance - Connect Passion
        </p>
      </div>

      <div className="h-52">
        <img
          src="/images/card-do-hoa-2.png"
          alt="Slider img"
          className="h-full object-contain"
        />
      </div>
    </div>
  );
};

const HomeSlider = () => {
  return (
    <div className="bg-[#F7DDD0] mb-12">
      <div className="container mx-auto px-3">
        <Carousel slidesToShow={1} autoplay draggable arrows>
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
        </Carousel>
      </div>
    </div>
  );
};

export default HomeSlider;
