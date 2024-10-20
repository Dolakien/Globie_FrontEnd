import React from "react";

const ProductInformation = ({ data }) => {
  return (
    <div className="my-10">
      <h2 className="uppercase text-lg font-semibold mb-2">Product detail</h2>
      <div className="flex gap-3 mb-3">
        <p className="w-40 text-gray-500">Brand</p>

        <p>{data.brand}</p>
      </div>
      <div className="flex gap-3 mb-3">
        <p className="w-40 text-gray-500">Origin</p>

        <p>{data.origin}</p>
      </div>
      <div className="flex gap-3 mb-3">
        <p className="w-40 text-gray-500">Warranty</p>

        <p>{data.warranty}</p>
      </div>
      <div className="flex gap-3 mb-3">
        <p className="w-40 text-gray-500">Category</p>

        <p>{data.productCategory.categoryName}</p>
      </div>
      <div className="flex gap-3 mb-3">
        <p className="w-40 text-gray-500">Send from</p>

        <p>{data.user.address}</p>
      </div>

      <h2 className="uppercase text-lg font-semibold mb-2 mt-6">
        Product description
      </h2>
      <p className="whitespace-pre-line">{data.description}</p>
    </div>
  );
};

export default ProductInformation;
