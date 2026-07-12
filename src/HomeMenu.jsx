import React from "react";

function HomeMenu({ userName, pengeluaran }) {
  return (
    <div style={{ backgroundImage: "url('/bg.webp')" }} className=" bg-size-[150%] sticky top-0 z-0 w-full py-12">
      <p className="text-white font-bold text-xl font-mono  pt-10 px-6">
        Hi {userName}
      </p>
      <p className="text-white font-mono text-xs font-light  px-6">
        Catat Semua Transaksi Kamu.
      </p>
      <div className="px-6 mx-auto mt-5 space-y-4">
        <div className="bg-black/40 backdrop-blur-md shadow-2xl shadow-black text-white p-7 rounded-xl">
          <p className="font-extralight">Pengeluaran Bulan Ini:</p>
          <p className="font-mono font-bold text-3xl">
            Rp.
            {pengeluaran.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <div className="flex items-center justify-center bg-black/40 backdrop-blur-md  shadow-2xl shadow-black text-white rounded-xl p-2   h-18">
            <div className="flex-col">
              <p className="font-bold font-monos">Tambah Transaksi</p>
            </div>
          </div>
          <div className="flex items-center justify-center bg-black/40 backdrop-blur-md shadow-2xl shadow-black text-white rounded-xl p-2  h-18">
            <div className="flex flex-col font-bold">
              <p>Export CSV</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomeMenu;
