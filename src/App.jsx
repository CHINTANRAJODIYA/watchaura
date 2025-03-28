import "./App.css";
import Navbarc from "./components/Navbar";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { Toaster } from "react-hot-toast";
import PrivateRoutes from "./components/PrivateRoutes";
import CreateProduct from "./components/admin/CreateProduct";
import OnalyAdminRoute from "./components/admin/OnalyAdminRoute";
import UserOrderPage from "./components/user/UserOrderPage";
import OrderPage from "./components/admin/OrderPage";
import Contect from "./pages/Contect";
import About from "./pages/About";
import ProductPage from "./components/Product/ProductPage";

const RoutesWithNavbar = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/signin" && location.pathname !== "/signup" && (
        <Navbarc />
      )}
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/productpage/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orderpage" element={<OrderPage />} />
        </Route>

        <Route element={<OnalyAdminRoute />}>
          <Route path="/createproduct" element={<CreateProduct />} />
        </Route>

        <Route path="/contect" element={<Contect />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <RoutesWithNavbar />
    </BrowserRouter>
  );
}

export default App;
