import axios from "axios";
import { Button, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const CategoryContainer = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const [products, setProducts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("term");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = {
        token: token,
      };
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP}/v1/product/getall`,
        { headers }
      );
      setProducts(response.data.products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleAddtoCart = async (pid) => {
    try {
      const userId = currentUser._id;
      const Body = { productId: pid, userId: userId };
      const Fetchdata = await axios.post(
        `${import.meta.env.VITE_REACT_APP}/v1/cart/add`,
        Body
      );
      if (Fetchdata.data.success == true) {
        toast.success(Fetchdata.data.msg);
      } else {
        toast.error(Fetchdata.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (tab) {
      const filtered = products.filter((item) => {
        // Implement your filtering logic here
        // For example, if 'tab' corresponds to product category
        return item.category === tab;
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [tab, products]);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className=" mx-auto p-3 mt-10 w-full ">
      <div className="flex flex-wrap mx-auto  justify-center gap-5">
        <div className="flex flex-wrap gap-3">
          <Button
            gradientDuoTone="purpleToBlue"
            onClick={(e) => setTab("shampoo")}
            outline
          >
            Shampoo
          </Button>
          <Button
            gradientDuoTone="purpleToBlue"
            onClick={(e) => setTab("hairoil")}
            outline
          >
            Hair Oil
          </Button>
          <Button
            gradientDuoTone="purpleToBlue"
            onClick={(e) => setTab("bathsoap")}
            outline
          >
            Bath Soap
          </Button>
          <Button
            gradientDuoTone="purpleToBlue"
            outline
            onClick={(e) => setTab("detergentsoap")}
          >
            Detergent Soap
          </Button>
          <Button
            gradientDuoTone="purpleToBlue"
            onClick={(e) => setTab("powder")}
            outline
          >
            Powder
          </Button>
          <Button
            gradientDuoTone="purpleToBlue"
            outline
            onClick={(e) => setTab("handwash")}
          >
            Hand Wash
          </Button>
          <Button
            gradientDuoTone="purpleToBlue"
            onClick={(e) => setTab("airdrop")}
            outline
          >
            Air Drop
          </Button>
          <Button
            gradientDuoTone="purpleToBlue"
            outline
            onClick={(e) => setTab("finail")}
          >
            Finail
          </Button>
          <Button
            gradientDuoTone="purpleToBlue"
            onClick={(e) => setTab("toiletcleaner")}
            outline
          >
            Toilet Cleaner
          </Button>
          <Button
            gradientDuoTone="purpleToBlue"
            onClick={(e) => setTab("brush")}
            outline
          >
            Brush
          </Button>
          <Button
            gradientDuoTone="purpleToBlue"
            onClick={(e) => setTab("others")}
            outline
          >
            Other
          </Button>
          <Button
            gradientDuoTone="purpleToBlue"
            onClick={(e) => setTab("others")}
            outline
          >
            Rolex
          </Button>
        </div>
        {loading ? (
          <Button color="gray">
            <Spinner aria-label="Alternate spinner button example" size="sm" />
            <span className="pl-3">Loading...</span>
          </Button>
        ) : (
          filteredProducts.map((item) => (
            <ProductCard
              key={item._id}
              handleUpdateProduct={handleUpdateProduct}
              HandleDeleteProduct={HandleDeleteProduct}
              handleAddtoCart={handleAddtoCart}
              item={item}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryContainer;
