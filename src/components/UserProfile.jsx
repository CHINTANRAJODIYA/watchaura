import {
  Alert,
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SignOutSuccess } from "../redux/user/UserSlice";
import toast from "react-hot-toast";

function UserProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    dispatch(SignOutSuccess());
    toast.success("SignOut Success.!!");
  };
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="relative  w-32 h-32 self-center cursor-pointer shadow-md rounded-full">
          <img
            src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
            alt="User Profile"
          />
        </div>

        <Label>User Name</Label>
        <Label className="p-2 bg-slate-200 rounded text-lg font-normal ">
          {currentUser.username}
        </Label>

        <label>Email</label>
        <label className="p-2 bg-slate-200 rounded text-lg ">
          {currentUser.email}
        </label>

        <label>Address</label>
        <label className="p-2 bg-slate-200 rounded text-lg ">
          {currentUser.address}
        </label>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <Button
          outline
          gradientDuoTone="purpleToBlue"
          className="cursor-pointer w-full"
          onClick={() => setShowModal(true)}
        >
          Sign Out
        </Button>
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size="md"
        >
          <ModalHeader />
          <ModalBody>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                Are you sure ! You want to LogOut your Account ?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handleSignOut}>
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
    </div>
  );
}

export default UserProfile;
