import React from "react";
import { FaInstagram } from "react-icons/fa6";
import { BsWhatsapp } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";
import { MdOutlinePhoneInTalk } from "react-icons/md";

const Contect = () => {
  return (
    <div className="flex  flex-col lg:flex-row justify-center max-w-7xl gap-4 mt-10 mx-auto">
      <div className="flex-0 justify-center mx-auto ">
        <img
          className="mx-auto h-[450px] w-[450px] object-contain"
          src="https://img.freepik.com/premium-vector/flat-man-customer-support_23-2148893293.jpg"
        />
      </div>

      <div className="flex-1  p-2 rounded justify-center items-center lg:mt-15 lg:max-w-lg lg:mx-auto ">
        <div className="flex items-center mb-5 bg-blue-200  p-5 rounded drop-shadow-lg gap-2">
          <FaInstagram className="h-9 w-9 text-blue-800 hover:scale-110 ease-in-out duration-300 cursor-pointer " />
          <a
            className="text-xl font-light"
            href="https://www.instagram.com/khushboodeep_sabu?igsh=MXdnNnJ2dTRpbHpq"
          >
            Follow us on Instrgam
          </a>
        </div>

        <div className="flex items-center mb-5 bg-green-200  p-5 rounded drop-shadow-lg gap-2">
          <BsWhatsapp className="h-9 w-9 text-green-500 hover:scale-110 ease-in-out duration-300 cursor-pointer " />
          <a
            className="text-xl font-light"
            href="https://chat.whatsapp.com/Iz8RvNO5vBm3Ga1D78I2R0"
          >
            Join in WhatsApp
          </a>
        </div>

        <div className="flex items-center mb-5 bg-red-200 p-5 rounded drop-shadow-lg gap-2">
          <HiOutlineMail className="h-9 w-9 text-red-500 hover:scale-110 ease-in-out duration-300 cursor-pointer " />
          <a
            className="text-md lg:text-xl font-light"
            href="mailto:watchaura@gmail.com"
          >
            watchaura@gmail.com
          </a>
        </div>
        <div className="flex items-center mb-5 bg-gray-200 p-5 rounded drop-shadow-lg gap-2">
          <SlLocationPin className="h-9 w-9 text-orange-700 hover:scale-110 ease-in-out duration-300 cursor-pointer " />
          <a
            className="text-xl font-light"
            href="https://maps.app.goo.gl/GwLYJXKTsdoTqyRe9?g_st=iw"
          >
            Our Location
          </a>
        </div>

        <div className="flex items-center mb-5 bg-purple-200 p-5 rounded drop-shadow-lg gap-2">
          <MdOutlinePhoneInTalk className="h-9 w-9 text-gray-700 hover:scale-110 ease-in-out duration-300 cursor-pointer " />
          <a className="text-md lg:text-xl font-light" href="tel:7046035746">
            Contect Number : 7046035746
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contect;
