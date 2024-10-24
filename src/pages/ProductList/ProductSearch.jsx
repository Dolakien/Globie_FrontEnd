import { useSearchParams } from "react-router-dom"; // To get the search keyword from URL
import { useQuery } from "@tanstack/react-query"; // Using react-query for API calls
import { useEffect } from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import productApi from "../../api/productApi"; // Import API
import ProductItem from "../../components/ProductItem/ProductItem";
import Search from "antd/es/transfer/search";


const ProductSearch = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("keyWord"); // Get the search keyword from the URL

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      console.log("Searching for:", searchQuery);
      let products = [];

      if (searchQuery) {
        const res = await productApi.searchProduct({ keyWord: searchQuery }); // Correct parameter name
        console.log("Search API response:", res);
        products = res.data?.data ?? []; // Use API data
      } else {
        const res = await productApi.getAllSellingProduct();
        products = res.data?.data ?? [];
      }

      // Fetch images for each product
      const productImageMap = await Promise.all(
        products.map(async (it) => {
          const imageRes = await productApi.getImageByProductId(it.productId);
          return {
            ...it,
            images: imageRes.data?.data || [],
          };
        })
      );

      return productImageMap; // Return products with images
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error; // Re-throw error for useQuery to handle
    }
  };

  // Use react-query to manage API call state
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["PRODUCT_LIST", searchQuery],
    queryFn: fetchProducts,
    enabled: !!searchQuery, // Only run the query if searchQuery exists
    onError: (err) => {
      console.error("Error fetching products:", err); // Log error
    },
  });

  const renderTitle = () => {
    return "Search Product"; // Always return "Search Product"
  };
  
  
  useEffect(() => {
    refetch(); // Call API when searchQuery changes
  }, [searchQuery, refetch]);

  return (
    <>
    <div className="container mx-auto py-6">
      <div className="container px-3 mx-auto my-8">
        <Breadcrumb
          items={[
            {
              title: <Link to="/">Homepage</Link>,
            },
            {
              title: renderTitle(), // Correctly calling the function
            },
          ]}
        />
      </div>
    </div>

    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold mb-4">
        Results for "{searchQuery}"
      </h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="my-12">
          {data?.length > 0 ? (
            <div className="grid grid-cols-12 gap-6 mt-8">

            {data.map((product) => (
              <ProductItem key={product.productId} className="col-span-4" data={product} />
            ))}
            </div>
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}
    </div>
    </>
  );
};

export default ProductSearch;
