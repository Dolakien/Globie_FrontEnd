import classNames from "classnames";
import React from "react";
import useProfile from "../../../hooks/useProfile";
import { STORE_INFO_STORAGE_KEY } from "../../../constants";
import { FaPhoneAlt, FaRegUserCircle, FaShare } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import styles from "../ProfileOverview/index.module.css";

const StoreInformation = () => {
  const { data } = useProfile();
  const store = JSON.parse(localStorage.getItem(STORE_INFO_STORAGE_KEY));

  return (
    <div className="container mx-auto px-3 pt-3">
      <div className="flex items-center justify-between my-3 gap-3">
        <div className="flex items-center gap-3">
          <img
            src={data?.avatar ?? "/images/avatar-default.jpg"}
            alt="Avatar"
            className="w-16 h-16 rounded-full object-cover"
          />

          <div>
            <p className="font-semibold">{store.storeName}</p>

            <p className="mt-1 text-gray-500">
              <span>&#x2022; </span>
              <span>Hoạt động 29 phút trước</span>
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="border rounded h-11 px-3 min-w-16 flex items-center justify-center gap-2 cursor-pointer">
            <FaShare />
          </button>

          <button className="border rounded h-11 px-3 min-w-16 flex items-center justify-center gap-2 cursor-pointer">
            <FaRegUserCircle />

            <p>Theo dõi</p>
          </button>

          <button className="border rounded h-11 px-3 min-w-16 flex items-center justify-center gap-2 cursor-pointer">
            <FaPhoneAlt />

            <p>{store.storePhone}</p>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <FaLocationDot />

        <p>{store.storeAddress}</p>
      </div>

      <img
        src="/images/banner-back-to-school.jpg"
        alt="Banner"
        className="block mt-3 w-full h-[500px] object-cover rounded-lg"
      />

      <div className="flex items-center justify-center mt-4 overflow-x-auto">
        <div>
          <p
            className={classNames(
              styles.tabItem,
              {
                [styles.active]: true,
              },
              "px-4"
            )}
          >
            <span>Cửa hàng</span>
          </p>
        </div>

        <div>
          <p
            className={classNames(
              styles.tabItem,
              {
                [styles.active]: false,
              },
              "px-4"
            )}
          >
            <span>Hoạt động</span>
          </p>
        </div>

        <div>
          <p
            className={classNames(
              styles.tabItem,
              {
                [styles.active]: false,
              },
              "px-4"
            )}
          >
            <span>Đánh giá</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoreInformation;
