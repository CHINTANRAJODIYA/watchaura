import { Button, Label, TextInput, Textarea } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  SignUpStart,
  SignUpSuccess,
  SignUpFail,
} from "../redux/user/UserSlice";
import { toast } from "react-hot-toast";
import axios from "axios";

function SignUp() {
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    username: "",
    email: "",
    address: "",
    password: "",
  });
  const handeChange = (e) => {
    const { id, value } = e.target;
    setFormdata({ ...formdata, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(SignUpStart());
    try {
      if (
        !formdata.username ||
        !formdata.email ||
        !formdata.address ||
        !formdata.password
      ) {
        toast.error("Invalid Values.!!");
      }

      const res = await axios.post(`${import.meta.env.VITE_REACT_APP}/v1/auth/signup`, formdata);
      if (res.data.success == true) {
        toast.success(res.data.msg);
        dispatch(SignUpSuccess(res.data));
        navigate("/signin");
      } else {
        toast.error(res.data.msg);
        dispatch(SignUpFail());
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex flex-col md:flex-row md:items-center p-3  max-w-4xl mx-auto gap-5">
        {/* Left Side Div */}
        <div className="flex-1">
          <img
            src="https://img.freepik.com/free-vector/sign-concept-illustration_114360-125.jpg"
            alt="Signup Image"
          />
        </div>

        {/* Right side Div */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="">
              <Label value="Your Username"></Label>
              <TextInput
                type="text"
                placeholder="User Name"
                id="username"
                onChange={handeChange}
              ></TextInput>
            </div>

            <div className="">
              <Label value="Your Email"></Label>
              <TextInput
                type="email"
                placeholder="Email"
                onChange={handeChange}
                id="email"
              ></TextInput>
            </div>

            <div className="">
              <Label value="Your Address"></Label>
              <Textarea
                type="text"
                onChange={handeChange}
                placeholder="Enter Your Address"
                id="address"
              ></Textarea>
            </div>

            <div className="">
              <Label value="Set Your Password"></Label>
              <TextInput
                type="password"
                onChange={handeChange}
                placeholder="Set Password"
                id="password"
              ></TextInput>
            </div>

            <Button gradientDuoTone="purpleToPink" type="submit">
              {loading ? "Loading..." : "Sign Up"}
            </Button>
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Have an Account?</span>
            <Link to="/signin" className="text-blue-600">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
