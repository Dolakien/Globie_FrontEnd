import classNames from "classnames";
import React from "react";
import { IoCloseOutline } from "react-icons/io5";

const Modal = ({ title, open, onClose, children }) => {
  return (
    <div
      className={classNames(
        "fixed top-0 right-0 bottom-0 left-0 transition-all",
        {
          "visible opacity-100": open,
          "invisible opacity-0": !open,
        }
      )}
    >
      {/* overlay */}
      <div
        className="absolute w-full h-full bg-black bg-opacity-30"
        onClick={onClose}
      ></div>

      <div className="absolute overflow-y-auto top-1/2 left-1/2 w-[576px] max-w-full -translate-y-1/2 bg-white max-h-[95vh] rounded-lg -translate-x-1/2">
        <header className="mt-6 text-right flex items-center mx-6">
          <p className="font-semibold">{title}</p>

          <IoCloseOutline
            className="ml-auto cursor-pointer text-2xl"
            onClick={onClose}
          />
        </header>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
