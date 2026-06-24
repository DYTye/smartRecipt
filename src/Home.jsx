import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import React from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import { FaFileUpload } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";

import FooterAndHeader from "./FooterAndHeader.jsx";
function home() {
  return (
    <>
      <FooterAndHeader />

      <div className="flex flex-col text-white mt-30 m-5">
        <p className="text-black mb-2">Halo, Aditya</p>
        <div className=" p-10 bg-gray-900 rounded-xl mb-5">
          <p className="font-extralight">Pengeluaran Bulan Ini:</p>
          <p className="font-mono font-bold text-3xl">Rp.12.000.000</p>
        </div>

        <div className="text-black flex flex-col gap-7">
          <p className="">Riwayat:</p>
          <div className="flex justify-between">
            <div>
              <p>Toko Pak Budi</p>
              <p className="font-extralight">12/02/2026</p>
            </div>
            <p className="font-bold">Rp.50.000</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <div>
              <p>Roti o pasar baru</p>
              <p className="font-extralight">12/02/2026</p>
            </div>
            <p className="font-bold">Rp.20.000</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <div>
              <p>Toko Jaya Plastik</p>
              <p className="font-extralight">12/02/2026</p>
            </div>
            <p className="font-bold">Rp.12.000</p>
          </div>
          <hr />
        </div>
      </div>
    </>
  );
}
export default home;
