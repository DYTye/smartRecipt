import React from "react";
import { useState } from "react";
import { IoMdHome } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { MdQrCodeScanner } from "react-icons/md";
import { Link } from "react-router-dom";

function Footer({ setProfil }) {
  return (
    <div className="max-w-xl bg-gray-900">
      <div className="fixed bottom-4 left-0 right-0  z-30 mx-auto w-fit bg-black/20 backdrop-blur-lg font-bold text-xl text-white text-center rounded-2xl">
        <ul className="flex justify-center gap-10 p-5 items-center">
          <li className="hover:bg-gray-500 rounded-full">
            <Link to="/Home">
              <IoMdHome />
            </Link>
          </li>
          <li className="hover:bg-gray-500 rounded-full">
            <Link to="/App">
              <MdQrCodeScanner />
            </Link>
          </li>
          <li className="hover:bg-gray-500 rounded-full">
            <button
              onClick={() => {
                setProfil(true);
              }}
              className="flex items-center justify-center focus:outline-none"
            >
              <CgProfile />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Footer;
