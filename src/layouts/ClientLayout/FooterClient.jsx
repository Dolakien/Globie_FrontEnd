import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaCcMastercard } from "react-icons/fa6";
import { FaFacebook, FaTelegram, FaCcVisa, FaCcPaypal } from "react-icons/fa";

const FooterClient = () => {
  return (
    <>
      <footer className="bg-[#FFD861] py-10">
        <div className="container mx-auto px-3 grid grid-cols-12 gap-4">
          <div className="col-span-3">
            <p className="text-sm font-bold text-[#262626] mb-4">Company</p>

            <ul>
              <li className="mb-2">
                <Link className="text-sm text-[#555555]">About Us</Link>
              </li>
              <li className="mb-2">
                <Link className="text-sm text-[#555555]">Our Store</Link>
              </li>
              <li className="mb-2">
                <Link className="text-sm text-[#555555]">Contact us</Link>
              </li>
            </ul>
          </div>

          <div className="col-span-3">
            <p className="text-sm font-bold text-[#262626] mb-4">Product</p>

            <ul>
              <li className="mb-2">
                <Link className="text-sm text-[#555555]">Selling Programs</Link>
              </li>
              <li className="mb-2">
                <Link className="text-sm text-[#555555]">Cooperation </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-3">
            <p className="text-sm font-bold text-[#262626] mb-4">How to Buy</p>

            <ul>
              <li className="mb-2">
                <Link className="text-sm text-[#555555]">Making Payments</Link>
              </li>
              <li className="mb-2">
                <Link className="text-sm text-[#555555]">Delivery Options</Link>
              </li>
              <li className="mb-2">
                <Link className="text-sm text-[#555555]">Buyer Protection</Link>
              </li>
              <li className="mb-2">
                <Link className="text-sm text-[#555555]">New User Guide</Link>
              </li>
            </ul>
          </div>

          <div className="col-span-3">
            <p className="text-sm font-bold text-[#262626] mb-4">Help</p>

            <ul>
              <li className="mb-2">
                <Link className="text-sm text-[#555555]">Contacts Us</Link>
              </li>
              <li className="mb-2">
                <Link className="text-sm text-[#555555]">FAQ</Link>
              </li>
              <li className="mb-2">
                <Link className="text-sm text-[#555555]">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      <div className="container mx-auto px-3">
        <div className="py-6 flex items-center justify-between">
          <div className="flex items-center gap-x-3 text-xl">
            <FaCcVisa />
            <FaCcMastercard />
            <FaCcPaypal />
          </div>

          <select name="" id="">
            <option value="">English</option>
          </select>
        </div>

        <div className="flex items-center justify-between border-t py-4">
          <p className="text-sm">
            D1 Street, D. D1, Long Thanh My, Thu Duc City, Ho Chi Minh City
          </p>

          <p className="text-sm text-[#9D9D9D]">
            ©2024 Globie, Inc. All Rights Reserved
          </p>

          <div className="flex items-center gap-x-3 text-xl">
            <FaInstagram />
            <FaFacebook />
            <FaTelegram />
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterClient;
