import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductSidebar from "../components/Product/ProductSidebar";
import ProductCardContainer from "../components/Product/ProductCardContainer";
import CreateProduct from "../components/admin/CreateProduct";
import AllUser from "../components/admin/AllUsers";
import UserOrderPage from "../components/user/UserOrderPage";
import Profile from "../components/UserProfile/";
import CategoryContainer from "../components/Product/CategoryContainer";

function Product() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState("allproduct");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleTabChange = (tab) => {
    setTab(tab);
    navigate(`/product?tab=${tab}`);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-3 md:w-56">
        <ProductSidebar />
      </div>
      <div className="md:flex-1">
        {tab === "allproduct" && <ProductCardContainer />}
        {tab === "createproduct" && <CreateProduct />}
        {tab === "allusers" && <AllUser />}
        {tab === "allorders" && <OrderList />}
        {tab === "yourorder" && <UserOrderPage />}
        {tab === "profile" && <Profile />}
        {tab === "categories" && <CategoryManager />}
        {tab === "category" && <CategoryContainer />}
      </div>
    </div>
  );
}

export default Product;
