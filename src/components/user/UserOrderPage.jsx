import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrderRow from "./OrderRow";
import { Button, Spinner } from "flowbite-react";
import toast from "react-hot-toast";

const UserOrderPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([]);
  const FetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = { token: token };
      const resp = await axios.get(`${import.meta.env.VITE_REACT_APP}/v1/product/getorder/${currentUser._id}`, {
        headers,
      });
      if (resp.data.success === true) {
        setOrder(resp.data.order);
        setLoading(false);
      } else {
        toast.success("No Order Found.!!");
        setOrder([]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div className="m-5 mx-auto w-full">
      <h1 className="bg-cyan-500 text-center w-sm rounded p-2 mb-5 text-2xl text-white">
        Order List
      </h1>
      {loading ? (
        <div className="flex justify-center">
          <Button color="gray">
            <Spinner aria-label="Loading..." size="md" />
            <span className="pl-3">Loading...</span>
          </Button>
        </div>
      ) : order.length === 0 ? (
        <div className="text-center">
          <h1 className="text-xl">No orders found.</h1>
        </div>
      ) : (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Customer Name</th>
                <th scope="col" className="px-6 py-3">Order Date</th>
                <th scope="col" className="px-6 py-3">Order ID</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Payment ID</th>
                <th scope="col" className="px-6 py-3">Payment Status</th>
                <th scope="col" className="px-6 py-3">Total Amount</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {order.map((item) => (
                <OrderRow key={item._id} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserOrderPage;
