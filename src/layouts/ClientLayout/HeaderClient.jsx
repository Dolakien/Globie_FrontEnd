import React from "react";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { AiFillInstagram } from "react-icons/ai";
import {
  FaFacebookF,
  FaRegBell,
  FaTelegramPlane,
  FaRegHeart,
  FaRegUser,
  FaRegEdit,
} from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { TOKEN_STORAGE_KEY, USER_ROLE_STORAGE_KEY } from "../../constants";

const HeaderClient = () => {
  const isLogged = localStorage.getItem(TOKEN_STORAGE_KEY);

  const onSignOut = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_ROLE_STORAGE_KEY);
    window.location.href = "/login";
  };

  return (
    <>
      <div className="container mx-auto flex items-center justify-between py-6 px-2 gap-6">
        <div className="flex items-center gap-x-6">
          <Link to="/" className="flex items-center">
            <img src="/images/logo.png" alt="Logo" />
            <p className="font-bold text-2xl">GLOBIE</p>
          </Link>

          <div className="border rounded-md flex items-center py-2">
            <input
              placeholder="Search products"
              className="px-3 placeholder:text-sm text-sm outline-none w-full"
            />

            <select name="" id="" className="text-sm outline-none">
              <option value="">All categories</option>
            </select>

            <div className="px-3 cursor-pointer border-l border-l-gray-300 ml-2">
              <IoSearch />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-x-6 gap-y-3 flex-wrap justify-end">
          <div className="flex items-center gap-x-6">
            <Link>About us</Link>
            <Link>Blog</Link>
            <Link>Build Computer Configuration</Link>
            <Link>Contact us</Link>
            <Link>Help & support</Link>
          </div>

          <div className="flex items-center gap-x-2">
            <Link>
              <AiFillInstagram className="text-2xl" />
            </Link>

            <Link>
              <FaFacebookF className="text-xl" />
            </Link>

            <Link>
              <FaTelegramPlane className="text-2xl" />
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-[#FFD861]">
        <div className="container mx-auto px-2 flex items-center py-4">
          <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-2">
              <CiBoxList className="text-xl" />
              <p className="font-semibold">Categories</p>
            </div>

            <select name="" id="" className="bg-transparent">
              <option value="">USA</option>
            </select>

            <select name="" id="" className="bg-transparent">
              <option value="English">English</option>
            </select>
          </div>

          <div className="ml-auto flex items-center gap-x-3">
            <FaRegHeart className="text-xl" />
            <FaRegBell className="text-xl" />
            <FaRegUser className="text-xl" />

            {isLogged ? (
              <p onClick={onSignOut} className="cursor-pointer">
                Đăng xuất
              </p>
            ) : (
              <Link to="/login">Đăng nhập</Link>
            )}

            <Link
              to="/post-product"
              className="flex items-center bg-orange-500 rounded-md p-3 gap-x-2 text-white text-sm font-semibold"
            >
              <FaRegEdit className="text-lg" />
              <p>POST PRODUCT</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderClient;
