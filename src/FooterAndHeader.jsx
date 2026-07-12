import React from "react";
import { useState } from "react";
import { IoMdHome } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { MdQrCodeScanner } from "react-icons/md";
import { Link } from "react-router-dom";

function home() {
  return (
    <div className="max-w-xl bg-gray-900">
      <div className="bg-white rounded-b-2xl font-bold text-xl  text-black text-center fixed top-0 w-full z-20">
        <p className="p-5">Smart Recipt</p>
      </div>
      <div className="fixed bottom-4 left-0 right-0  z-30 mx-auto w-fit bg-gray-900 font-bold text-xl text-white text-center rounded-2xl shadow-xl shadow-black/40">
        <ul className="flex justify-center gap-10 p-5">
          <li className="hover:bg-gray-500 rounded-full">
            <Link to="/Home">
              <IoMdHome />
            </Link>
          </li>
          <li className="hover:bg-gray-500 rounded-full">
            <Link to="/App"><MdQrCodeScanner /></Link>
          </li>
          <li className="hover:bg-gray-500 rounded-full">
            <CgProfile />
          </li>
        </ul>
      </div>
    </div>
  );
}
export default home;
