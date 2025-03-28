import axios from "axios";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

import { FaCheck, FaTimes } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

const AllUsers = () => {
  const [allusers, setAllusers] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        token: token,
      };
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP}/v1/auth/getusers`, {
        headers,
      });
      setAllusers(response.data.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        token: token,
      };

      const resp = await axios.delete(`${import.meta.env.VITE_REACT_APP}/v1/auth/deleteuser/${userId}`, {
        headers,
      });
      if (resp.data.success === true) {
        toast.success(resp.data.msg);
        fetchData();
      } else {
        toast.error(resp.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scroll-track-slate-100 scrollbar-thumb-slate-300 dark:scroll-track-slate-700 dark:scrollbar-thumb-slate-500">
      <Table hoverable className="shadow-md">
        <TableHead>
          <TableHeadCell>Profile</TableHeadCell>
          <TableHeadCell>Username</TableHeadCell>
          <TableHeadCell>Email</TableHeadCell>
          <TableHeadCell>Address</TableHeadCell>
          <TableHeadCell>Admin</TableHeadCell>
          <TableHeadCell>Delete</TableHeadCell>
        </TableHead>
        {allusers.length === 0 ? (
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">
                      Data Not Found
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
          allusers.map((user) => (
            <TableBody key={user._id} className="divide-y">
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"
                    alt="User Image"
                    className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                  />
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>
                  {user.isAdmin ? (
                    <FaCheck className="text-green-500" />
                  ) : (
                    <FaTimes className="text-red-500" />
                  )}
                </TableCell>
                <TableCell>
                  <button
                    className="font-medium text-red-500 hover:underline hover:bg-red-600 hover:text-white p-2 rounded hover:cursor-pointer"
                    onClick={(e) => handleDeleteUser(user._id)}
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

export default AllUsers;
