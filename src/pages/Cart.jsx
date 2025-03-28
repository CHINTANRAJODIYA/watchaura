import { Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { useCart } from ".././context/CartProvider";

const Cart = () => {
  const [ShowModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [CartProduct, setCartProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(CartProduct.quantity);
  // For Updating Cart Length
  const { setCartLength } = useCart();

  const TotalPrice = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const FetchCartItem = async () => {
    try {
      const resp = await axios.get(
        `${import.meta.env.VITE_REACT_APP}/v1/cart/getcart/${currentUser._id}`
      );
      if (resp.data.success == true) {
        setCartProduct(resp.data.item);
        setTotalPrice(TotalPrice(resp.data.item));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchCartItem();
  }, []);

  const UpdateQuentity = async (productId, quantity) => {
    try {
      const userId = currentUser._id;
      const resp = await axios.patch(
        `${import.meta.env.VITE_REACT_APP}/v1/cart/update`,
        {
          userId,
          productId,
          quantity,
        }
      );
      if (resp.data.success == true) {
        FetchCartItem();
        //toast.success(resp.data.msg);
      } else {
        toast.error(resp.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const RemoveCartItem = async (productId) => {
    try {
      const userId = currentUser._id;
      const resp = await axios.post(
        `${import.meta.env.VITE_REACT_APP}/v1/cart/remove`,
        { productId, userId }
      );
      if (resp.data.success == true) {
        FetchCartItem();
        toast.success(resp.data.msg);
        // Updating Cart Lenght
        setCartLength((prev) => (prev -= 1));
      } else {
        toast.error(resp.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrderPlace = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = {
        token: token,
      };

      const resp = await axios.post(
        `${import.meta.env.VITE_REACT_APP}/v1/cart/placeorder/${
          currentUser._id
        }`,
        {},
        { headers }
      );

      if (resp.data.success) {
        setLoading(false);
        toast.success(resp.data.msg);

        // Razorpay Payment Options
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: resp.data.saveorder.totalamount * 100, // Amount in paise
          currency: "INR",
          name: "Watch Aura",
          description: `Order #${resp.data.saveorder.ordernumber}`,
          order_id: resp.data.saveorder.razorpayOrderId, // Razorpay Order ID from server
          handler: async function (response) {
            // Payment was successful, now verify the payment on the server
            const verificationResp = await axios.post(
              `${import.meta.env.VITE_REACT_APP}/v1/cart/verifypayment`,
              {
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              },
              { headers }
            );

            if (verificationResp.data.success) {
              toast.success(verificationResp.data.msg);
              setShowModal(false);
              FetchCartItem(); // Refresh cart
            } else {
              toast.error(verificationResp.data.msg);
            }
          },
          prefill: {
            name: currentUser.name,
            email: currentUser.email,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else {
        setLoading(false);
        toast.error(resp.data.msg);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleQuantityChange = (productId, change) => {
    const item = CartProduct.find((item) => item.productId === productId);
    const newQuantity = Math.max(1, item.quantity + change);
    UpdateQuentity(productId, newQuantity);
  };

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Shopping Cart
        </h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {/* Cart Item  */}

              {CartProduct.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">
                      Your Cart is Empty
                    </h2>
                    <p className="text-gray-500">
                      Sorry, the requested data was not found.
                    </p>
                  </div>
                </div>
              ) : (
                CartProduct?.map((item) => (
                  <div
                    key={item.productId}
                    className="rounded-lg border border-gray-200 bg-white p-5  md:p-3 drop-shadow-md"
                  >
                    <div className="space-y-4  md:flex md:items-center bg-gray-200 p-4 rounded md:justify-center md:gap-5 md:space-y-0">
                      <img
                        className="h-full w-[200px] md:h-[200px] md:w-[180px] bg-white mx-auto"
                        src={`${item.image}`}
                        alt="imac image"
                      />

                      <div className="flex items-center justify-center md:order-3 md:justify-end">
                        <div className="flex  lg:justify-between gap-4 items-center">
                          <h1>Quentity:</h1>

                          <button
                            type="button"
                            className="px-1 py-1 bg-gray-300 rounded"
                            onClick={() =>
                              handleQuantityChange(item.productId, -1)
                            }
                          >
                            -
                          </button>
                          <TextInput
                            type="number"
                            id="qty"
                            value={item.quantity}
                            className="rounded w-16"
                            onChange={(e) =>
                              UpdateQuentity(
                                item.productId,
                                parseInt(e.target.value, 10)
                              )
                            }
                            placeholder=""
                            required
                          />

                          <button
                            type="button"
                            className="px-1 py-1 bg-gray-300 rounded"
                            onClick={() =>
                              handleQuantityChange(item.productId, 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="w-full min-w-0  flex-1  space-y-4 md:order-2 md:max-w-md">
                        <div className="flex gap-2 flex-col  ">
                          <h1 className=" text-3xl font-semibold  text-gray-900 hover:underline ">
                            {item.name}
                          </h1>
                          <div className="flex gap-3">
                            <h1 className="text-lg">Price</h1>
                            <h1 className=" text-lg  text-gray-900 hover:underline ">
                              <span className="text-xl mr-1">₹</span>
                              {item.price} /-
                            </h1>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <button
                            className="bg-red-500 p-1  text-white hover:bg-red-600"
                            onClick={(e) => RemoveCartItem(item.productId)}
                          >
                            Remove Item
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Order Summery */}

          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-3xl bg-indigo-500 p-2 rounded text-white font-normal text-center ">
                Order Summary
              </p>
              <div className="flex text-lg justify-between">
                <p className="font-medium">Product</p>
                <p className="font-medium">Price</p>
                <p className="font-medium">Quantity</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  {CartProduct.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between border-b py-2"
                    >
                      <div className="flex-1 text-base text-gray-900 dark:text-gray-400">
                        {item.name}
                      </div>
                      <div className="flex-1 text-base text-gray-900 dark:text-white text-center">
                        ₹{item.price}
                      </div>
                      <div className="flex-1 text-base text-gray-900 dark:text-white text-right">
                        {item.quantity}
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="  text-xl font-medium text-gray-900 dark:text-gray-400">
                      Total Price
                    </dt>
                    <dd className="text-xl font-medium text-gray-900 dark:text-white">
                      {totalPrice}
                    </dd>
                  </dl>
                </div>
              </div>

              <Button
                className="w-full"
                outline
                gradientDuoTone="purpleToBlue"
                onClick={() => setShowModal(true)}
              >
                Place Order
              </Button>

              <div className="flex items-center justify-center gap-2">
                <Link
                  to="/product?tab=allproduct"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                >
                  Continue Shopping
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 12H5m14 0-4 4m4-4-4-4"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
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
              Confirm Order
            </h1>
            <div className="flex justify-between mb-5">
              <h1 className="text-xl font-normal">Product Name</h1>
              <h1 className="text-xl font-normal"> Quantity</h1>
            </div>
            <div className="mb-5 ">
              {CartProduct.map((item) => (
                <dl
                  key={item.productId}
                  className="flex items-center bg-indigo-500 p-2 gap-2 mb-2 rounded  justify-between "
                >
                  <dt className=" text-base font-medium text-white dark:text-gray-400">
                    {item.name}
                  </dt>
                  <dd className="text-base font-medium text-white dark:text-white">
                    {item.quantity}
                  </dd>
                </dl>
              ))}
              <div className="flex justify-between bg-green-500 text-white p-2  mt-5">
                <h1 className="text-lg">Final Amount</h1>
                <h1 className="text-lg">{totalPrice}</h1>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleOrderPlace}>
                {loading ? "Loading..." : "Confirm"}
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                Cancle
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </section>
  );
};

export default Cart;
