import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { SignOutSuccess } from "../redux/user/UserSlice";
import toast from "react-hot-toast";

function Navbarc() {
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    dispatch(SignOutSuccess());
    toast.success("SignOut Success.!!");
  };
  //bg-stone-900
  //bg-slate-950
  return (
    <div className="mb-0">
      <Navbar className="drop-shadow-lg bg-white">
        <NavbarBrand href="/" className="rounded">
          <img
            src="/logo2.png"
            className="h-[50px] w-[120px] rounded"
            alt="Image LOgo"
          />
        </NavbarBrand>

        <div className="flex md:order-2 justify-between gap-4 items-center">
          {!currentUser && (
            <Link to="/signin">
              <Button gradientDuoTone="greenToBlue" outline>
                Sign In
              </Button>
            </Link>
          )}
          <NavbarToggle />
        </div>
        <NavbarCollapse>
          <Link to="/">
            <NavbarLink className="text-xl text-black" active={path === "/"}>
              Home
            </NavbarLink>
          </Link>

          <Link to="/product?tab=allproduct">
            <NavbarLink
              active={path === "/product"}
              className="text-xl text-black"
            >
              Products
            </NavbarLink>
          </Link>

          {currentUser && currentUser.isAdmin === true ? (
            <Link to="/product?tab=allorders">
              <NavbarLink className="text-xl text-black">All Order</NavbarLink>
            </Link>
          ) : (
            <Link to="/product?tab=yourorder">
              <NavbarLink className="text-xl text-black">Your Order</NavbarLink>
            </Link>
          )}

          <Link to="/contect">
            <NavbarLink
              className="text-xl text-black"
              active={path === "/contect"}
            >
              Contact
            </NavbarLink>
          </Link>

          <Link to="/about">
            <NavbarLink
              className="text-xl text-black"
              active={path === "/about"}
            >
              About us
            </NavbarLink>
          </Link>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
}

export default Navbarc;
