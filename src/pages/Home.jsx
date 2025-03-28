import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Footer from "../components/Footer";

function Home() {
  // const FetchData = async () => {
  //   try {
  //     const resp = await axios.get(
  //       `${import.meta.env.VITE_REACT_APP}/v1/product/getimage`
  //     );
  //     if (resp.data.success == true) {
  //       setImages(resp.data.images);
  //     } else {
  //       toast.error(resp.data.msg);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   FetchData();
  // }, []);
  return (
    <div className="min-h-screen flex flex-col ">
      <div className="mb-5">
        <div className="w-full h-auto bg-slate-100 ">
          <video className="w-full mx-auto" autoPlay loop muted>
            <source src="/watch2.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      <h1 className="w-full font-sans-serif text-4xl  mx-auto mb-10 bg-gradient-to-r from-[#a16207] to-[#e3bd25] text-white p-5  text-center mt-5">
        Top Brands
      </h1>

      <div className=" flex flex-wrap gap-4 justify-center mx-auto mb-10 ">
        <div className="max-w-sm  bg-white border border-gray-200 m-4 shadow mt-10">
          <Link to="/product?tab=allproduct&&term=rolex">
            <div className="p-10">
              <img className="rounded-t-lg " src="/rolex.png" alt="" />
            </div>
          </Link>
        </div>

        <div className="max-w-sm bg-white border border-gray-200 m-4 shadow mt-10">
          <Link to="/product?tab=allproduct&&term=zenith">
            <div className="mt-5 ">
              <img className="rounded-t-lg" src="/zenith.png" alt="" />
            </div>
          </Link>
        </div>

        <div className="max-w-sm bg-white border border-gray-200 m-4  shadow mt-10">
          <Link to="/product?tab=allproduct&&term=breitling">
            <div className="p-10">
              <img className="rounded-t-lg " src="/breitling.png" alt="" />
            </div>
          </Link>
        </div>

        <div className="max-w-sm bg-white border border-gray-200 m-4 shadow mt-10">
          <Link to="/product?tab=allproduct&&term=seiko">
            <div className="p-10 mt-8">
              <img className="rounded-t-lg" src="/seiko.png" alt="" />
            </div>
          </Link>
        </div>

        <div className="max-w-sm bg-white border border-gray-200 m-4  shadow mt-10">
          <Link to="/product?tab=allproduct&&term=longines">
            <div className="p-1">
              <img
                className="rounded-t-lg h-[250px] w-[370px] "
                src="/longines.png"
                alt=""
              />
            </div>
          </Link>
        </div>

        <div className="max-w-sm  bg-white border border-gray-200 m-4 shadow mt-10">
          <Link to="/product?tab=allproduct&&term=hublot">
            <div className="mt-5">
              <img className="rounded-t-lg" src="/hublot.png" alt="" />
            </div>
          </Link>
        </div>

        <div className="max-w-sm bg-white border border-gray-200 m-4 shadow mt-3">
          <Link to="/product?tab=allproduct&&term=titan">
            <div className="">
              <img
                className="rounded-t-lg h-[260px] w-[400px] "
                src="/titan.png"
                alt=""
              />
            </div>
          </Link>
        </div>

        <div className="max-w-sm bg-white border border-gray-200 m-4 shadow mt-3">
          <Link to="/product?tab=allproduct&&term=omega">
            <div>
              <img
                className="rounded-t-lg h-[260px] w-[400px] "
                src="/omega.png"
                alt=""
              />
            </div>
          </Link>
        </div>

        <div className="max-w-sm bg-white border border-gray-200 m-4  shadow mt-3">
          <Link to="/product?tab=allproduct&&term=tagheuer">
            <div>
              <img
                className="rounded-t-lg h-[260px] w-[400px]"
                src="/tag.png"
                alt=""
              />
            </div>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
