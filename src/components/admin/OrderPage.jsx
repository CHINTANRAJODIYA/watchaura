import axios from "axios";
import { Label } from "flowbite-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const OrderPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("orderId");
  const [orderData, setOrderData] = useState([]);

  const FetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        token: token,
      };
      const resp = await axios.get(
        `${import.meta.env.VITE_REACT_APP}/v1/product/orderby/${orderId}`,
        {
          headers,
        }
      );
      if (resp.data.success == true) {
        setOrderData(resp.data.order);
      } else {
        toast.error(resp.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);
  return (
    <div className="m-3 max-w-4xl mx-auto">
      <h1 className="bg-[#eab308] p-2 text-xl text-white font-normal text-center rounded drop-shadow-md">
        Order Deatils
      </h1>
      <div className="overflow-x-auto mt-2 drop-shadow-md">
        <table className="min-w-full border mb-4 bg-white  rounded-lg">
          <tbody>
            <tr className="border-b bg-gray-100">
              <th className="px-6 py-3 text-left ">Customer Name</th>
              <td className="px-6 py-3">{orderData.username}</td>
            </tr>
            <tr className="border-b">
              <th className="px-6 py-3 text-left ">Delivery Address</th>
              <td className="px-6 py-3">{orderData.address}</td>
            </tr>
            <tr className="border-b bg-gray-100">
              <th className="px-6 py-3 text-left ">Order Id</th>
              <td className="px-6 py-3">{orderData.ordernumber}</td>
            </tr>
            <tr className="border-b">
              <th className="px-6 py-3 text-left ">Order Date</th>
              <td className="px-6 py-3">
                {new Date(orderData.createdAt).toLocaleDateString()}
              </td>
            </tr>
            <tr className="border-b bg-gray-100">
              <th className="px-6 py-3 text-left "> Order Status</th>
              <td className="px-6 py-3">{orderData.status}</td>
            </tr>
            <tr>
              <th className="px-6 py-3 text-left ">Total Amount</th>
              <td className="px-6 py-3">{orderData.totalamount}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-gray-100 rounded p-4">
        <div>
          {orderData &&
            orderData.items?.map((item) => (
              <div
                key={item._id}
                className="space-y-4 drop-shadow-md bg-white mb-3 rounded md:flex md:items-center md:justify-center md:gap-6 md:space-y-0"
              >
                <img
                  className="h-[180px] w-[180px] dark:hidden mx-auto"
                  src={`${item.image}`}
                  alt="imac image"
                />

                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                  <div className="flex items-start">
                    <Label className="text-lg w-1/3">Product Name</Label>
                    <h1 className="text-lg text-gray-900  flex-1">
                      : {item.name}
                    </h1>
                  </div>
                  <div className="flex items-start">
                    <Label className="text-lg w-1/3">Quantity</Label>
                    <h1 className="text-lg text-gray-900  flex-1">
                      : {item.quantity} Piece
                    </h1>
                  </div>
                  <div className="flex items-start">
                    <Label className="text-lg w-1/3">Price</Label>
                    <h1 className="text-lg text-gray-900  flex-1">
                      : ₹ {item.price}
                    </h1>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
