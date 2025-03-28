import { Button } from "flowbite-react";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useState } from "react";

const OrderRow = ({ item }) => {
  const [ShowModal, setShowModal] = useState(false);

  return (
    <>
      <tr className="bg-white border-b hover:bg-gray-50">
        <td className="px-6 py-4">{item.username}</td>
        <td className="px-6 py-4">{new Date(item.createdAt).toLocaleDateString()}</td>
        <td className="px-6 py-4">{item.ordernumber}</td>
        <td className="px-6 py-4">
          <span
            className={`font-medium px-2 py-1 rounded ${
              item.status === "Pending"
                ? "bg-yellow-100 text-yellow-500"
                : item.status === "Processing"
                ? "bg-blue-100 text-blue-500"
                : item.status === "Shipped"
                ? "bg-purple-100 text-purple-500"
                : item.status === "Delivered"
                ? "bg-green-100 text-green-500"
                : "bg-red-100 text-red-500"
            }`}
          >
            {item.status}
          </span>
        </td>
        <td className="px-6 py-4">{item.razorpayOrderId}</td>
        <td className="px-6 py-4">
          <span
            className={`font-medium px-2 py-1 rounded ${
              item.paymentStatus === "Pending" ? "bg-red-100 text-red-500" : "bg-green-100 text-green-500"
            }`}
          >
            {item.paymentStatus}
          </span>
        </td>
        <td className="px-6 py-4">₹{item.totalamount}</td>
        <td className="px-6 py-4">
          <Button
            gradientDuoTone="purpleToPink"
            onClick={() => setShowModal(true)}
            outline
            size="sm"
          >
            Details
          </Button>
        </td>
      </tr>

      <Modal
        show={ShowModal}
        onClose={() => setShowModal(false)}
        popup
        position="center"
        size="sm"
      >
        <ModalHeader />
        <ModalBody>
          <div className="">
            <h1 className="text-2xl text-center mb-5 text-green-500 font-semibold">
              Order Details
            </h1>
            <div className="flex justify-between mb-5">
              <h1 className="text-xl font-normal">Product Name</h1>
              <h1 className="text-xl font-normal">Quantity</h1>
              <h1 className="text-xl font-normal">Price</h1>
            </div>
            <div className="mb-5">
              {item.items.map((i) => (
                <dl
                  key={i._id}
                  className="flex items-center text-center bg-indigo-500 p-2 gap-2 mb-2 rounded justify-between"
                >
                  <dt className="text-base font-medium text-white dark:text-gray-400">
                    {i.name}
                  </dt>
                  <dd className="text-base font-medium text-white dark:text-white">
                    {i.quantity}
                  </dd>
                  <dd className="text-base font-medium text-white dark:text-white">
                    ₹{i.price}
                  </dd>
                </dl>
              ))}
            </div>
            <div className="flex justify-between bg-red-500 text-white p-2 mb-5">
              <h1>Total Amount</h1>
              <h1>₹{item.totalamount}</h1>
            </div>
            <div className="flex justify-center gap-4">
              <Button color="success" onClick={() => setShowModal(false)}>
                Ok
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default OrderRow; 