import { Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  SignInStart,
  SignInSuccess,
  SignInFail,
} from "../redux/user/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";

function SignIn() {
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });
  const handeChange = (e) => {
    const { id, value } = e.target;
    setFormdata({ ...formdata, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(SignInStart());
    try {
      if (!formdata.email || !formdata.password) {
        toast.error("Invalid Values.!!");
      }
      const FetchData = await axios.post(`${import.meta.env.VITE_REACT_APP}/v1/auth/signin`, formdata);

      if (FetchData.data.success === true) {
        toast.success(FetchData.data.msg);
        dispatch(SignInSuccess(FetchData.data.user));
        localStorage.setItem("token", FetchData.data.token);
        navigate("/");
      } else {
        toast.error(FetchData.data.msg);
        dispatch(SignInFail());
      }
    } catch (error) {
      dispatch(SignInFail());
      console.log(error.message);
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex flex-col md:flex-row md:items-center p-3  max-w-4xl mx-auto gap-5">
        {/* Left Side Div */}
        <div className="flex-1">
          <img
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg"
            alt="SignIn Image"
          />
        </div>

        {/* Right side Div */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="">
              <Label value="Your Email"></Label>
              <TextInput
                type="email"
                onChange={handeChange}
                placeholder="Email"
                id="email"
              ></TextInput>
            </div>

            <div className="">
              <Label value="Your Password"></Label>
              <TextInput
                type="password"
                onChange={handeChange}
                placeholder="Password"
                id="password"
              ></TextInput>
            </div>

            <Button gradientDuoTone="purpleToPink" type="submit">
              {loading ? "Loading..." : "Sign In"}
            </Button>
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Have an Account?</span>
            <Link to="/signup" className="text-blue-600">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
