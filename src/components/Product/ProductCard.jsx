import { Card, Label } from "flowbite-react";
import { useSelector } from "react-redux";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

function ProductCard({
  item,
  handleAddtoCart,
  HandleDeleteProduct,
  HandleUpdateProduct,
}) {
  const { currentUser } = useSelector((state) => state.user);
  const [ShowModal, setShowModal] = useState(false);
  return (
    <Card className="max-w-xs ">
      <div className="flex justify-center items-center h-full  cursor-pointer">
        <Link to={`/productpage/${item._id}`}>
          <img
            src={`${item.image}`}
            alt="Apple Watch Series 7 in colors pink, silver, and black"
            className="w-[200px] h-[200px] object-cover justify-center align-middle" // Adjust the width and height as needed
          />
        </Link>
      </div>
      <div className="">
        <div className="flex">
          <Label className="text-xl text-center  justify-center">
            {item.name}
          </Label>
        </div>
      </div>

      <p className="text-normal font-bold">{item.description}</p>
      <Label className="text-bold ">
        <span className="text-black text-xl ">{item.price}</span>
        <span className="text-xl text-red-500 ml-1">₹</span>
      </Label>
      <div className="flex justify-between">
        {currentUser.isAdmin === true ? (
          <div className="flex gap-2">
            <button
              className="bg-red-500 p-1 text-sm  rounded text-white hover:bg-red-600"
              onClick={() => HandleDeleteProduct(item._id)}
            >
              Delete Product
            </button>
            <button
              type="button"
              className="bg-green-500 p-1 text-sm rounded text-white hover:bg-green-600"
              onClick={() => HandleUpdateProduct(item._id)}
            >
              Update Product
            </button>
          </div>
        ) : (
          <Button
            gradientDuoTone="purpleToBlue"
            className=""
            onClick={() => handleAddtoCart(item._id)}
            outline
          >
            Add to Cart
          </Button>
        )}
        <Modal
          show={ShowModal}
          onClose={() => setShowModal(false)}
          popup
          size="md"
        >
          <ModalHeader />
          <ModalBody>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                Are you sure ! You want to Delete this Product ?
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  color="failure"
                  onClick={() => HandleDeleteProduct(item._id)}
                >
                  Yes I'm sure
                </Button>
                <Button color="gray" onClick={() => setShowModal(false)}>
                  Cancle
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </Card>
  );
}

export default ProductCard;
