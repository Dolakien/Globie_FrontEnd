import classNames from "classnames";
import React from "react";
import { IoSendOutline } from "react-icons/io5";

const ContactForm = ({ className }) => {
  return (
    <div
      className={classNames(
        "mx-auto bg-[#E5BB39] text-center rounded-md w-[576px] mt-10 p-8",
        className
      )}
    >
      <p className="font-semibold text-2xl">
        <span className="text-white">GLOBIE</span>
        <span className="text-[#9D9D9D]"> PLATFORM</span>
      </p>

      <p className="my-4 text-white">
        Register your email not to miss the last minutes off+ Free delivery
      </p>

      <div className="flex items-center mx-auto bg-white rounded-lg w-80 h-10">
        <input
          type="text"
          placeholder="Enter your email"
          className="bg-transparent flex-1 ml-4 outline-none"
        />

        <IoSendOutline className="mx-4" />
      </div>
    </div>
  );
};

export default ContactForm;
