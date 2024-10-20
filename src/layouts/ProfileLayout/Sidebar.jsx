import React from "react";
import { NavLink } from "react-router-dom";

import { FaUser, FaSignOutAlt, FaListUl } from "react-icons/fa";
import { FaCartShopping, FaLocationDot } from "react-icons/fa6";
import useProfile from "../../hooks/useProfile";

const Sidebar = () => {
  const { data } = useProfile();

  return (
    <aside className="bg-white rounded h-full">
      <header className="p-4 flex items-center gap-x-6 border-b border-b-[#CFCFCF] mb-1.5">
        <img
          src={data?.avatar ?? "https://picsum.photos/200/200"}
          alt="Avatar"
          className="w-[48px] h-[48px] rounded-full object-cover"
        />

        <p className="text-[18px] font-semibold text-[#111]">
          {data?.fullName ?? "No Name"}
        </p>
      </header>

      <div className="pb-6">
        <NavLink
          to="/profile/information"
          className="flex items-center py-3 px-5 gap-x-3 text-[#111] hover:text-[#f97316] transition-all [&.active]:text-[#f97316]"
          end
        >
          <FaUser />

          <p>Thông tin tài khoản</p>
        </NavLink>

        <NavLink
          to="/account/address"
          className="flex items-center py-3 px-5 gap-x-3 text-[#111] hover:text-[#f97316] transition-all [&.active]:text-[#f97316]"
          end
        >
          <FaLocationDot />

          <p>Sổ địa chỉ</p>
        </NavLink>

        <NavLink
          to="/profile/orders-history"
          className="flex items-center py-3 px-5 gap-x-3 text-[#111] hover:text-[#f97316] transition-all [&.active]:text-[#f97316]"
        >
          <FaCartShopping />

          <p>Quản lý đơn hàng</p>
        </NavLink>

        <NavLink
          to="/profile/my-products"
          className="flex items-center py-3 px-5 gap-x-3 text-[#111] hover:text-[#f97316] transition-all [&.active]:text-[#f97316]"
        >
          <FaListUl />

          <p>Sản phẩm của tôi</p>
        </NavLink>

        <NavLink
          to="/profile/bookmark"
          className="flex items-center py-3 px-5 gap-x-3 text-[#111] hover:text-[#f97316] transition-all [&.active]:text-[#f97316]"
        >
          <FaListUl />

          <p>Sản phẩm yêu thích</p>
        </NavLink>

        <div className="flex items-center py-3 px-5 gap-x-3 text-[#111] hover:text-[#f97316] transition-all cursor-pointer">
          <FaSignOutAlt />

          <p>Đăng xuất</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
