import React from "react";

import StoreInformation from "./StoreInformation";
import { FaLocationDot } from "react-icons/fa6";
import { STORE_INFO_STORAGE_KEY } from "../../../constants";
import { FaPhoneAlt } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { FaShieldHalved } from "react-icons/fa6";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import SellingProduct from "./SellingProduct";

const StoreOverview = () => {
  const store = JSON.parse(localStorage.getItem(STORE_INFO_STORAGE_KEY));

  return (
    <>
      <StoreInformation />

      <div className="bg-gray-100 px-3 py-5">
        <div className="container mx-auto px-3">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-6 rounded-lg p-5 bg-white">
              <p className="font-semibold text-xl">Giới thiệu</p>

              <p className="mt-4 p-3 bg-gray-100 rounded-lg">
                Chuyên cung cấp các loại laptop xách tay nhập khẩu nguyên zin
              </p>

              <div className="flex items-center gap-2 mt-3">
                <FaLocationDot />

                <p>{store.storeAddress}</p>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <FaPhoneAlt />

                <p>{store.storePhone}</p>
              </div>
            </div>

            <div className="col-span-6 rounded-lg p-5 bg-white">
              <p className="font-semibold text-xl">Chính sách cửa hàng</p>

              <div className="mt-4 flex items-center gap-3">
                <MdLocalShipping className="text-3xl" />

                <p>Miễn phí vận chuyển nội thành</p>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <FaShieldHalved className="text-2xl" />

                <p>Miễn phí bảo hành 1 - 12 tháng phần cứng</p>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <FaArrowRightArrowLeft className="text-2xl" />

                <p>Đảm bảo 1 đổi 1 trong 7 ngày</p>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <MdOutlinePayment className="text-2xl" />

                <p>Trả góp lãi xuất 0% qua THẺ TÍN DỤNG</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg p-5 bg-white mt-5">
            <p className="font-semibold text-xl">Sản phẩm đang bán</p>

            <SellingProduct />
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreOverview;
