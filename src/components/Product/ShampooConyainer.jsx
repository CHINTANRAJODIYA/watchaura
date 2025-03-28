import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Button, Spinner } from "flowbite-react";

const ShampooConyainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = {
        token: token,
      };
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP}/v1/product/bycategory?category=shampoo`,
        {
          headers,
        }
      );
      setProducts(response.data.items);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleAddtoCart = async (pid) => {
    try {
      const userId = currentUser._id;
      const Body = { productId: pid, userId: userId };
      const Fetchdata = await axios.post(`${import.meta.env.VITE_REACT_APP}/v1/cart/add`, Body);
      if (Fetchdata.data.success == true) {
        toast.success(Fetchdata.data.msg);
      } else {
        toast.error(Fetchdata.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" mx-auto p-3 mt-5 w-full">
      <div className="flex flex-wrap mx-auto overflow-auto justify-center gap-5">
        {loading ? (
          <Button color="gray">
            <Spinner aria-label="Alternate spinner button example" size="sm" />
            <span className="pl-3">Loading...</span>
          </Button>
        ) : (
          products.map((item) => (
            <ProductCard
              key={item._id}
              handleAddtoCart={handleAddtoCart}
              item={item}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ShampooConyainer;
