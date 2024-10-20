import React, { useState } from "react";
import StoreTab from "./StoreTab";
import classNames from "classnames";
import { Empty } from "antd";
import ProductInformation from "./ProductInformation";
import RatingTab from "./RatingTab";

const TAB = {
  STORE: "STORE",
  INFORMATION: "INFORMATION",
  REVIEW: "REVIEW",
};

const C = {
  [TAB.STORE]: StoreTab,
  [TAB.INFORMATION]: ProductInformation,
  [TAB.REVIEW]: RatingTab,
};

const CustomEmpty = () => <Empty className="my-10" />;

const ProductDetailTab = (props) => {
  const { data } = props;

  const [activeTab, setActiveTab] = useState(TAB.STORE);

  const Content = C[activeTab] ?? CustomEmpty;

  return (
    <>
      <div className="flex items-center justify-center pb-2 border-b gap-10 mt-12">
        <p
          className={classNames(
            "uppercase font-medium text-[#9D9D9D] cursor-pointer",
            {
              "!text-[#262626]": activeTab === TAB.STORE,
            }
          )}
          onClick={() => setActiveTab(TAB.STORE)}
        >
          Store
        </p>
        <p
          className={classNames(
            "uppercase font-medium text-[#9D9D9D] cursor-pointer",
            {
              "!text-[#262626]": activeTab === TAB.INFORMATION,
            }
          )}
          onClick={() => setActiveTab(TAB.INFORMATION)}
        >
          Product details
        </p>
        <p
          className={classNames(
            "uppercase font-medium text-[#9D9D9D] cursor-pointer",
            {
              "!text-[#262626]": activeTab === TAB.REVIEW,
            }
          )}
          onClick={() => setActiveTab(TAB.REVIEW)}
        >
          Reviews
        </p>
      </div>

      <Content data={data} />
    </>
  );
};

export default ProductDetailTab;
