import { Button, Card } from "flowbite-react";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useState } from "react";

const OrderCard = ({ item }) => {
  const [ShowModal, setShowModal] = useState(false);
  console.log(item);

  return (
    <Card className="w-[350px]">
      <div className="flex justify-between">
        <h1 className="text-lg text-gray-900 font-medium">Customer Name :</h1>
        <h1 className="text-lg text-gray-700 font-normal">{item.username}</h1>
      </div>
      <div className="flex justify-between">
        <h1 className="text-lg font-medium">Order Date :</h1>
        <h1 className="text-lg text-gray-700 font-normal ">
          {new Date(item.createdAt).toLocaleDateString()}
        </h1>
      </div>
      <div className="flex justify-between">
        <h1 className="text-lg font-medium">Order Id :</h1>
        <h1 className="text-lg text-gray-700 font-normal ">
          {item.ordernumber}
        </h1>
      </div>
      <div className="flex justify-between">
        <h1 className="text-lg font-medium">Order Status :</h1>
        <h1
          className={`font-medium bg-gray-200 p-2 rounded ${
            item.status === "Pending"
              ? "text-yellow-500"
              : item.status === "Processing"
              ? "text-blue-500"
              : item.status === "Shipped"
              ? "text-purple-500"
              : item.status === "Delivered"
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {item.status}
        </h1>
      </div>
      <div className="flex justify-between ">
        <h1 className="text-lg font-medium mb-1">Payment Id:</h1>
        <h1 className="  text-md">{item.razorpayOrderId}</h1>
      </div>
      <div className="flex justify-between ">
        <h1 className="text-lg font-medium mb-1">Payment Status:</h1>
        <h1
          className={`font-medium bg-gray-200 p-2 rounded ${
            item.status === "Pending" ? "text-red-500" : "text-green-500"
          }`}
        >
          {item.paymentStatus}
        </h1>
      </div>
      <div className="flex justify-between ">
        <h1 className="text-lg font-medium mb-1">Total Amount :</h1>
        <h1 className="  text-lg">{item.totalamount}</h1>
      </div>
      <Button
        gradientDuoTone="purpleToPink"
        onClick={() => setShowModal(true)}
        outline
      >
        More Info
      </Button>
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
              <h1 className="text-xl font-normal"> Quantity</h1>
              <h1 className="text-xl font-normal">Price</h1>
            </div>
            <div className="mb-5 ">
              {item.items.map((i) => (
                <dl
                  key={i._id}
                  className="flex items-center text-center bg-indigo-500 p-2 gap-2 mb-2 rounded  justify-between "
                >
                  <dt className=" text-base font-medium text-white dark:text-gray-400">
                    {i.name}
                  </dt>
                  <dd className="text-base font-medium text-white dark:text-white">
                    {i.quantity}
                  </dd>
                  <dd className="text-base font-medium text-white dark:text-white">
                    {i.price}
                  </dd>
                </dl>
              ))}
            </div>
            <div className="flex  justify-between bg-red-500 text-white p-2 mb-5">
              <h1>Total Amount</h1>
              <h1>{item.totalamount}</h1>
            </div>
            <div className="flex justify-center gap-4">
              <Button color="success" onClick={() => setShowModal(false)}>
                Ok
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </Card>
  );
};

export default OrderCard;
