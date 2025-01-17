import React, { useState, useEffect } from "react";
import { getAdminProducts, updateProduct } from "../../services/adminApi";
import AdminHeader from "../../components/admin/AdminHeader";
import SearchBar from "../../components/admin/SearchBar";

const FeaturedItems = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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

  const toggleFeatured = async (product) => {
    try {
      await updateProduct(product._id, {
        ...product,
        featured: !product.featured,
      });
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900">
      <AdminHeader title="Featured Items Management" />
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        Featured Items Management
      </h2>
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
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                {product.category}
              </p>
              <button
                onClick={() => toggleFeatured(product)}
                className={`w-full py-2 px-4 rounded-md ${
                  product.featured
                    ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 hover:bg-yellow-200 dark:hover:bg-yellow-800"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {product.featured ? "Featured" : "Add to Featured"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedItems;
