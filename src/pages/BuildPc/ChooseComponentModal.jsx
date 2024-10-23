import React, { useState } from "react";
import Modal from "../../components/Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import productApi from "../../api/productApi";
import { formatPrice } from "../../utils/formatPrice";
import { Empty } from "antd";

// Mock brands and origins
const brands = ["Intel", "AMD", "NVIDIA", "ASUS", "Gigabyte", "MSI", "Corsair", "Kingston",
    "ASRock", "G.Skill", "Crucial", "HyperX", "Patriot", "Samsung", "Western Digital", "Seagate",
    "EVGA", "Seasonic", "Thermaltake", "Cooler Master", "FSP", "NZXT", "Fractal Design", "be quiet!",
    "Lian Li", "Phanteks", "InWin", "SilverStone"];
const origins = ["USA", "China", "Taiwan", "Germany", "Japan", "Korea", "Canada", "UK", "France", "India"];

const ProductSearchItem = ({ data, onBuyClick }) => {
  // Lấy ảnh đầu tiên từ danh sách images nếu có, nếu không thì dùng ảnh mặc định
  const productImage = data?.images?.[0]?.imagePath || "/images/default-product.png";

  return (
    <div className="py-3 [&:not(:last-child)]:border-b border-dashed flex items-center gap-3">
      <div className="w-24 h-24 rounded-lg border">
        <img
          src={productImage}
          alt="Product"
          className="block w-full h-full object-cover"
        />
      </div>

      <div className="text-sm">
        <p>{data?.productName}</p>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <p className="font-semibold">{formatPrice(data?.price)}đ</p>

        <button onClick={onBuyClick} className="px-3 py-0.5 rounded border border-[#434343] text-[#434343] text-sm cursor-pointer font-medium">
          Buy
        </button>
      </div>
    </div>
  );
};

const ChooseComponentModal = ({ open, onClose, categoryId, onProductSelect }) => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Query để lấy sản phẩm và ảnh
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["PRODUCT_RELATED", categoryId, selectedBrand, selectedOrigin, minPrice, maxPrice, searchTerm],
    queryFn: async () => {
      const params = {
        brand: selectedBrand || undefined,
        origin: selectedOrigin || undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        search: searchTerm || undefined,
        categoryId: categoryId || undefined,
      };

      const res = await productApi.filterBuildPc(params);
      const products = res.data.data;

      // Lấy ảnh cho mỗi sản phẩm
      const productWithImages = await Promise.all(
        products.map(async (product) => {
          const imageRes = await productApi.getImageByProductId(product.productId);
          return {
            ...product,
            images: imageRes.data?.data || [], // Thêm mảng ảnh vào sản phẩm
          };
        })
      );

      return productWithImages;
    },
    enabled: open,
  });

  const handleBuyClick = (product) => {
    onProductSelect(product); // Thêm sản phẩm vào danh sách đã chọn
    onClose(); // Đóng modal
  };

  // Xử lý lỗi nếu có
  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  return (
    <Modal title="Filter" open={open} onClose={onClose}>
      <div className="grid grid-cols-12 gap-3">
        {/* Brand Select */}
        <div className="col-span-4 border border-[#434343] rounded py-4 text-center">
          <select
            className="outline-none uppercase"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">BRANDS</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Origin Select */}
        <div className="col-span-4 border border-[#434343] rounded py-4 text-center">
          <select
            className="outline-none uppercase"
            value={selectedOrigin}
            onChange={(e) => setSelectedOrigin(e.target.value)}
          >
            <option value="">ORIGIN</option>
            {origins.map((origin) => (
              <option key={origin} value={origin}>
                {origin}
              </option>
            ))}
          </select>
        </div>

        {/* Min Price Input */}
        <div className="col-span-4 border border-[#434343] rounded py-4 text-center">
          <input
            type="number"
            placeholder="MIN PRICE"
            className="outline-none w-full text-center"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        {/* Max Price Input */}
        <div className="col-span-4 border border-[#434343] rounded py-4 text-center">
          <input
            type="number"
            placeholder="MAX PRICE"
            className="outline-none w-full text-center"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      {/* Search Input */}
      <div className="p-3 rounded-2xl border border-[#434343] mt-4">
        <input
          type="text"
          placeholder="Search product"
          className="outline-none w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Product List */}
      <div className="mt-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : products && products.length > 0 ? (
          products.map((it) => (
            <ProductSearchItem key={it.productId} data={it} onBuyClick={() => handleBuyClick(it)} />
          ))
        ) : (
          <Empty className="mt-10" description="No products found" />
        )}
      </div>
    </Modal>
  );
};

export default ChooseComponentModal;
