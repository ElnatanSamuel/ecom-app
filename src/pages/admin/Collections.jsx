import React, { useState, useEffect } from "react";
import { getAdminProducts, updateProduct } from "../../services/adminApi";
import { useDarkMode } from "../../context/DarkModeContext";
import AdminHeader from "../../components/admin/AdminHeader";
import SearchBar from "../../components/admin/SearchBar";

const Collections = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Living Room");
  const { isDarkMode } = useDarkMode();
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["Living Room", "Bedroom", "Dining", "Office", "Outdoor"];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAdminProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products
    .filter((product) => product.category === selectedCategory)
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const getCategoryCount = (category) => {
    return products.filter((product) => product.category === category).length;
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900">
      <AdminHeader title="Collections Management" />
      <div className="space-y-6">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <div className="mb-6">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mt-1 p-4 block w-full rounded-md border-gray-100 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category} ({getCategoryCount(category)})
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-gray-900 dark:text-white">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
              >
                <img
                  src={
                    product.images.find((img) => img.isThumbnail)?.url ||
                    product.images[0]?.url
                  }
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {product.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collections;
