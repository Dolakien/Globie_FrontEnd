import React from "react";

const Banner = () => {
  return (
    <div className="relative pt-[30%]">
      <div className="flex absolute top-0 right-0 bottom-0 left-0">
        <img
          src="/images/banner-left.png"
          alt="Banner left"
          className="block w-[35%] object-cover"
        />

        <img
          src="/images/banner-right.png"
          alt="Banner right"
          className="block w-full object-cover flex-1"
        />
      </div>

      <div className="absolute top-1/2 left-[35%] -translate-x-1/2 -translate-y-1/2 w-80">
        <div className="bg-white text-center py-10">
          <p className="font-bold text-[#262626] text-xl">Summer Essentials</p>
          <p className="text-xl mt-1 text-[#FF2E00] font-bold">20% off</p>
        </div>

        <p className="bg-[#262626] text-center py-3 text-white">
          19 Jul-30 Jul
        </p>
      </div>
    </div>
  );
};

export default Banner;
