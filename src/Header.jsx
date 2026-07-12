import React from "react";
import { CiMenuFries } from "react-icons/ci";

function home() {
  return (
    <div className="max-w-xl bg-gray-900">
      <div className="backdrop-blur-md bg-[#2a2c2e] fixed top-2 rounded-2xl font-bold text-xl  text-white text-center w-full z-20">
        <div className="flex items-center justify-center relative">
          <CiMenuFries className="text-3xl absolute left-5"/>
          <div className="p-5 ">Smart Receipt</div>
        </div>
      </div>
    </div>
  );
}
export default home;
