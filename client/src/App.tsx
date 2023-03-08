import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CategoryPage from "./pages/CategoryPage";
import ShopCartPage from "./pages/ShopCartPage";
import DashBoard from "./pages/seller/DashBoard";
import ProtectedSeller from "./components/protected/ProtectedSeller";
import ProtectedCustomer from "./components/protected/ProtectedCustomer";
import ProductDetailPage from "./pages/ProductDetailPage";
import CategoryListPage from "./pages/seller/CategoryListPage";
import ProductListPage from "./pages/seller/ProductListPage";
import ProductDetailSellerPage from "./pages/seller/ProductDetailSellerPage";
import SearchResultPage from "./pages/SearchResultPage";

function App() {
  return (
    <Routes>
      <Route path="/" index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/productdetail" element={<ProductDetailPage />} />
      <Route path="/category" element={<CategoryPage />} />
      <Route path="/products" element={<SearchResultPage />} />
      <Route
        path="/shoppingcart"
        element={
          <ProtectedCustomer>
            <ShopCartPage />
          </ProtectedCustomer>
        }
      />
      <Route
        path="/seller/dashboard"
        element={
          <ProtectedSeller>
            <DashBoard />
          </ProtectedSeller>
        }
      />
      <Route
        path="/seller/products"
        element={
          <ProtectedSeller>
            <ProductListPage />
          </ProtectedSeller>
        }
      />
      <Route
        path="/seller/categories"
        element={
          <ProtectedSeller>
            <CategoryListPage />
          </ProtectedSeller>
        }
      />
      <Route
        path="/seller/products/detail"
        element={
          <ProtectedSeller>
            <ProductDetailSellerPage />
          </ProtectedSeller>
        }
      />
    </Routes>
  );
}

export default App;
