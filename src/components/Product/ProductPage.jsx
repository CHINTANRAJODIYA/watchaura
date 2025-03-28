import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const FetchProduct = async (req, res) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { token: token };
      const resp = await axios.get(
        `${import.meta.env.VITE_REACT_APP}/v1/product/getproduct/${id}`,
        {
          headers,
        }
      );

      if (resp.data.success == true) {
        setProduct(resp.data.product);
      } else {
        toast.error(resp.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchProduct();
  }, [id]);

  return (
    <div className="flex flex-col min-h-[660px] md:flex-row items-center p-6 bg-slate-50  rounded-lg">
      <div className="md:w-1/2 flex justify-center items-center mb-4 md:mb-0 mt-20 transform transition-transform duration-300 hover:scale-105 cursor-pointer">
        {product && (
          <img
            src={product.image}
            alt={product.name}
            className="w-[400px] h-[400px] object-cover rounded-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer"
          />
        )}
      </div>
      <div className="md:w-1/2 flex flex-col  justify-center p-10 mt-10 drop-shadow-xl  bg-gradient-to-r from-[#e3a857] to-[#c3a220]">
        {product && (
          <div>
            <h1 className="text-5xl font-bold text-white drop-shadow-lg mb-5 uppercase">
              {product.category}
            </h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-5">
              {product.name}
            </h2>
            <p className="text-gray-800 drop-shadow-md mb-6 max-w-sm ">
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <h1 className="text-5xl font-bold text-slate-700 mb-5">
                ₹{product.price}/-
              </h1>
            </div>
            <span className=" text-lg uppercase font-normal">onaly</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
