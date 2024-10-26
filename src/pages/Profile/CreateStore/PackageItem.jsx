import { Radio } from "antd";
import React from "react";
import { formatPrice } from "../../../utils/formatPrice";
import classNames from "classnames";

const PackageItem = ({ data, value, onChange }) => {
  const selected = data.memberLevelId === value;

  return (
    <div
      className={classNames(
        "col-span-12 lg:col-span-6 border rounded-lg p-3 cursor-pointer",
        {
          "!border-[#f79316] bg-[#f79316] bg-opacity-15": selected,
        }
      )}
      onClick={() => onChange(data.memberLevelId)}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">{data.levelName}</p>

          <p className="mt-2">{formatPrice(data.price)}đ</p>
        </div>

        <Radio checked={selected} />
      </div>
    </div>
  );
};

export default PackageItem;
