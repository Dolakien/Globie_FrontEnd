import React, { useState } from "react";

import styles from "./index.module.css";
import ProductItem from "../../../components/ProductItem/ProductItem";

const TABS = [
  {
    id: 1,
    label: "Đang hiển thị",
  },
  {
    id: 2,
    label: "Đã bán",
  },
];

const ProfileOverview = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  return (
    <>
      <div className="flex items-center justify-between mt-3 overflow-x-auto">
        {TABS.map((it, idx) => (
          <p
            key={idx}
            className={`${styles.tabItem} ${
              activeTab === it.id && styles.active
            }`}
            onClick={() => setActiveTab(it.id)}
          >
            <span>{it.label}</span>

            {activeTab === it.id && (
              <span className="text-[#ff3c53]"> (1)</span>
            )}
          </p>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4 m-4">
        <ProductItem className="col-span-4" />
        <ProductItem className="col-span-4" />
        <ProductItem className="col-span-4" />
        <ProductItem className="col-span-4" />
      </div>
    </>
  );
};

export default ProfileOverview;
