import React, { useEffect, useState } from "react";
import ProductSidebar from "../components/Product/ProductSidebar";
import ProductCardContainer from "../components/Product/ProductCardContainer";
import UserProfile from "../components/UserProfile";
import { useLocation } from "react-router-dom";
import ShampooConyainer from "../components/Product/ShampooConyainer";
import AllUsers from "../components/admin/AllUsers";
import OrderContainer from "../components/admin/OrderContainer";
import UserOrderPage from "../components/user/UserOrderPage";
import CategoryContainer from "../components/Product/CategoryContainer";
import CategoryManager from "../components/admin/CategoryManager";

function Product() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <ProductSidebar />
      </div>
      <div className="flex-1">
        {tab === "allproduct" && <ProductCardContainer />}
        {tab === "profile" && <UserProfile />}
        {tab === "yourorder" && <UserOrderPage />}
        {tab === "categories" && <CategoryManager />}
        {tab === "allusers" && <AllUsers />}
        {tab === "allorders" && <OrderContainer />}
      </div>
    </div>
  );
}

export default Product;