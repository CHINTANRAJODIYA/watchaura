import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
  TableRow,
  TableCell,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const OrderContainer = () => {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ status: "" });
  const [filterName, setFilterName] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const FetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = { token: token };
      const resp = await axios.get(
        `${import.meta.env.VITE_REACT_APP}/v1/auth/getallorder`,
        {
          headers,
        }
      );
      if (resp.data.success === true) {
        setOrder(resp.data.orders);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        token: token,
      };

      const resp = await axios.patch(
        `${import.meta.env.VITE_REACT_APP}/v1/auth/updatestatus/${id}`,
        { status },
        {
          headers,
        }
      );
      if (resp.data.success === true) {
        toast.success(resp.data.msg);
        FetchData();
      } else {
        toast.error(resp.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        token: token,
      };

      const resp = await axios.delete(
        `${import.meta.env.VITE_REACT_APP}/v1/auth/delete/${id}`,
        {
          headers,
        }
      );
      if (resp.data.success === true) {
        toast.success(resp.data.msg);
        FetchData();
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

  const filterorder = order.filter((item) => {
    const matchname = filterName
      ? item.username.toLowerCase().includes(filterName.toLowerCase())
      : true;

    return matchname;
  });

  const sortedOrders = filterorder.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scroll-track-slate-100 scrollbar-thumb-slate-300 dark:scroll-track-slate-700 dark:scrollbar-thumb-slate-500">
      <div className="flex justify-between mb-5">
        <div className="flex  gap-4">
          <TextInput
            type="text"
            placeholder="Enter customer name ..."
            id="name"
            onChange={(e) => setFilterName(e.target.value)}
          />
          <Button gradientDuoTone="purpleToPink">Search</Button>
        </div>
        <div className="flex gap-4">
          <Button
            gradientDuoTone="purpleToBlue"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            A to Z
          </Button>
        </div>
      </div>
      <Table hoverable className="shadow-md">
        <TableHead>
          <TableHeadCell>Username</TableHeadCell>
          <TableHeadCell>Date</TableHeadCell>
          <TableHeadCell>Order Id</TableHeadCell>
          <TableHeadCell>Address</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
          <TableHeadCell>Details</TableHeadCell>
          <TableHeadCell>update status</TableHeadCell>
          <TableHeadCell>Delete</TableHeadCell>
        </TableHead>

        {sortedOrders.length === 0 ? (
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">
                      Orders Not Found
                    </h2>
                    <p className="text-gray-500">
                      Sorry, the requested data was not found.
                    </p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          sortedOrders.map((item) => (
            <TableBody key={item._id} className="divide-y">
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>{item.username}</TableCell>
                <TableCell>
                  {new Date(item.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{item.ordernumber}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>
                  <span
                    className={`font-medium ${
                      item.status === "Pending"
                        ? "text-red-500" // Change to yellow for Pending status
                        : item.status === "Processing"
                        ? "text-blue-500" // Change to blue for Processing status
                        : item.status === "Shipped"
                        ? "text-yellow-500" // Change to purple for Shipped status
                        : item.status === "Delivered"
                        ? "text-green-500" // Change to green for Delivered status
                        : "text-red-500" // Default to red for any other status
                    } hover:underline hover:cursor-pointer`}
                  >
                    {item.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Link to={`/orderpage?orderId=${item._id}`}>
                    <button className="bg-indigo-500 p-2  text-white hover:bg-indigo-600 rounded">
                      More Details
                    </button>
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <select
                      className="rounded  bg-gray-200 p-1 "
                      onChange={(e) => setStatus(e.target.value)}
                      value={item.status}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Reject">Reject</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                    <button
                      className="bg-green-500 p-2  text-white hover:bg-green-600 rounded"
                      onClick={(e) => handleUpdateStatus(item._id)}
                    >
                      Update Status
                    </button>
                  </div>
                </TableCell>
                <TableCell>
                  <button
                    className="bg-red-500 p-2  text-white hover:bg-red-600 rounded"
                    onClick={(e) => handleDeleteOrder(item._id)}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            </TableBody>
          ))
        )}
      </Table>
    </div>
  );
};

export default OrderContainer;
