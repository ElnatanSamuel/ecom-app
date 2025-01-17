import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Collections from "./pages/Collections";
import Contact from "./pages/Contact";
import { CartProvider } from "./context/CartContext";
import OurStory from "./pages/OurStory";
import ProductDetail from "./pages/ProductDetail";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Checkout from "./pages/Checkout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import ProductManagement from "./pages/admin/ProductManagement";
import FeaturedItems from "./pages/admin/FeaturedItems";
import AdminCollections from "./pages/admin/Collections";
import Stats from "./pages/admin/Stats";
import { DarkModeProvider } from "./context/DarkModeContext";

function App() {
  return (
    <Provider store={store}>
      <DarkModeProvider>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <CartProvider>
              <Routes>
                {/* Admin Routes */}
                <Route path="/admin" element={<ProtectedRoute />}>
                  <Route index element={<Stats />} />
                  <Route path="products" element={<ProductManagement />} />
                  <Route path="featured" element={<FeaturedItems />} />
                  <Route path="collections" element={<AdminCollections />} />
                  <Route path="stats" element={<Stats />} />
                </Route>
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Public Routes */}
                <Route
                  path="*"
                  element={
                    <div className="min-h-screen bg-gray-50 flex flex-col">
                      <Navbar />
                      <main className="flex-grow">
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/products" element={<Products />} />
                          <Route
                            path="/collection/:category"
                            element={<Collections />}
                          />
                          <Route path="/our-story" element={<OurStory />} />
                          <Route
                            path="/product/:id"
                            element={<ProductDetail />}
                          />
                          <Route path="/contact" element={<Contact />} />
                          <Route path="/checkout" element={<Checkout />} />
                        </Routes>
                      </main>
                      <Footer />
                    </div>
                  }
                />
              </Routes>
            </CartProvider>
          </Router>
        </PersistGate>
      </DarkModeProvider>
    </Provider>
  );
}

export default App;
