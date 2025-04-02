import { Sidebar, SidebarItem, SidebarItemGroup } from "flowbite-react";
import { HiUser } from "react-icons/hi";
import { FaHandPointRight } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
import { AiOutlineProduct } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoNewspaperOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { LuBox } from "react-icons/lu";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../../context/CartProvider";
import { MdCategory } from "react-icons/md";

function ProductSidebar() {
  const { currentUser } = useSelector((state) => state.user);
  const { cartLength } = useCart();
  console.log(cartLength);

  return (
    <Sidebar className="w-full md:w-56" color="blue">
      <SidebarItemGroup className="flex flex-col gap-1">
        {currentUser && currentUser.isAdmin === true && (
          <Link to="/product?tab=categories">
            <SidebarItem
              as="div"
              label="Admin"
              labelColor="dark"
              icon={MdCategory}
            >
              Manage Categories
            </SidebarItem>
          </Link>
        )}
        {currentUser && currentUser.isAdmin === true && (
          <Link to="/createproduct">
            <SidebarItem
              as="div"
              label="Admin"
              labelColor="dark"
              icon={AiOutlineProduct}
            >
              Create Product
            </SidebarItem>
          </Link>
        )}
        {currentUser && currentUser.isAdmin === true && (
          <Link to="/product?tab=allusers">
            <SidebarItem
              as="div"
              label="Admin"
              labelColor="dark"
              icon={HiUsers}
            >
              All User
            </SidebarItem>
          </Link>
        )}
        {currentUser && currentUser.isAdmin === true && (
          <Link to="/product?tab=allorders">
            <SidebarItem as="div" label="Admin" labelColor="dark" icon={LuBox}>
              All Orders
            </SidebarItem>
          </Link>
        )}

        <Link to="/product?tab=allproduct">
          <SidebarItem as="div" icon={FaHandPointRight}>
            Product
          </SidebarItem>
        </Link>

        {currentUser && currentUser.isAdmin === false && (
          <Link to="/cart">
            <SidebarItem as="div" icon={BsCart3}>
              <div className="flex justify-between">
                Cart
                <span className="text-white bg-red-500 h-5 w-5 flex items-center justify-center rounded-full">
                  {cartLength}
                </span>
              </div>
            </SidebarItem>
          </Link>
        )}

        {currentUser && currentUser.isAdmin === false && (
          <Link to="/product?tab=yourorder">
            <SidebarItem as="div" icon={IoNewspaperOutline}>
              Your Order
            </SidebarItem>
          </Link>
        )}

        <Link to="/product?tab=profile">
          <SidebarItem as="div" icon={HiUser}>
            Profile
          </SidebarItem>
        </Link>
      </SidebarItemGroup>
    </Sidebar>
  );
}

export default ProductSidebar;