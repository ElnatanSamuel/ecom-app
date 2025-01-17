import axios from "axios";

const API_URL = "https://ecom-server-zeta.vercel.app/api/admin";

const getToken = () => {
  return localStorage.getItem("adminToken");
};

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    console.log(
      "Request config:",
      config.url,
      token ? "Token present" : "No token"
    );
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export const getAdminProducts = async () => {
  const response = await axiosInstance.get("/products");
  return response.data;
};

export const createProduct = async (productData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axiosInstance.post("/products", productData, config);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axiosInstance.put(
    `/products/${id}`,
    productData,
    config
  );
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axiosInstance.delete(`/products/${id}`);
  return response.data;
};

export const getDashboardStats = async () => {
  const response = await axiosInstance.get("/stats");
  return response.data;
};

export const updateProductImages = async (id, formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axiosInstance.put(
    `/products/${id}/images`,
    formData,
    config
  );
  return response.data;
};
