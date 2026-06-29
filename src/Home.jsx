import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import React from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import { FaFileUpload } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { MdQrCodeScanner } from "react-icons/md";
import { Link } from "react-router-dom";

import FooterAndHeader from "./FooterAndHeader.jsx";
function home() {
  const dataHistori = [
    {
      nama: "Toko Jaya Abadi",
      tanggal: "12/2/2026",
      total: "Rp.20.000",
    },
    {
      nama: "Roti O",
      tanggal: "13/2/2026",
      total: "Rp.40.000",
    },
    {
      nama: "Sanjai Anim",
      tanggal: "12/4/2026",
      total: "Rp.22.000",
    },
    {
      nama: "Toko Bunda",
      tanggal: "10/4/2026",
      total: "Rp.12.000",
    },
    {
      nama: "Toko Ayah",
      tanggal: "10/4/2026",
      total: "Rp.12.000",
    },
    {
      nama: "Toko Adek",
      tanggal: "10/4/2026",
      total: "Rp.12.000",
    },
  ];

  console.log(dataHistori);
  return (
    <div className="relative">
      <FooterAndHeader />
      <div className="bg-gray-900 sticky top-0 z-0 w-full h-96">
        <p className="text-white font-bold text-xl font-mono  pt-10 px-6">
          halo Aditya
        </p>
        <p className="text-white font-mono text-xs font-light   px-6">
          Lorem ipsum dolor sit amet.
        </p>
        <div className="w-90 mx-auto mt-10">
          <div className="bg-white text-black p-7 rounded-xl">
            <p className="font-extralight">Pengeluaran Bulan Ini:</p>
            <p className="font-mono font-bold text-3xl">Rp.12.000.000</p>
          </div>
          <div className="grid grid-cols-2 m-2 items-center ">
            <div className="flex items-center justify-center bg-white p-2  text-black rounded-xl w-40 mx-auto h-18">
              <div className="flex-col">
                <p>Batas Bulan ini : </p>
                <p className="font-bold font-monos">Rp.15.000.000</p>
              </div>
            </div>
            <div className="flex items-center justify-center bg-white p-2 text-black rounded-xl w-40 mx-auto h-18">
              <div className="flex flex-col font-bold">
                <p>Export CSV</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-white w-full rounded-4xl text-black -mt-7 relative z-20">
        <p className="mt-5 mx-auto font-light bg-gray-200 rounded-full px-2 py-1 w-25 text-xs shadow-xl"></p>
        {dataHistori.map((item) => {
          return (
            <>
              <div className="flex justify-between m-2 ring-1s ring-black/70 p-5 rounded-xl shadow-xl">
                <div>
                  <p>{item.nama}</p>
                  <p className="font-extralight">{item.tanggal}</p>
                </div>
                <p className="font-bold">{item.total}</p>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
export default home;
