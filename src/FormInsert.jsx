import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabase";

function InserManual({setTambahManual}) {
  const navigate = useNavigate();
  const [namaToko, setNamaToko] = useState("");
  const [totalBelanja, setTotalBelanja] = useState("");

  const handleSimpanTransaksi = async (event) => {
    event.preventDefault();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      alert(" login ulang dulu.");
      return;
    }

    const { data, error } = await supabase
      .from("transactions")
      .insert([
        {
          merchant_name: namaToko || "Tanpa Nama",
          total_amount: Number(totalBelanja || 0),
          date: new Date().toISOString().split("T")[0],
          image_url: null,
          user_id: user.id,
        },
      ])
      .select();

    if (error) {
      console.error("Gagal store data:", error.message);
      alert(`Eror : ${error.message}`);
    } else {
      alert("Transaksi tersimpan");
      navigate("/Home");
    }
  };

  return (
    <div className="m-5 rounded-2xl border-2 border-black bg-white p-5 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-mono">
      <h3 className="mb-4 font-bold text-lg border-b-2 border-black pb-2">
        Input Manual
      </h3>

      <form onSubmit={handleSimpanTransaksi} className="space-y-4">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="namaMerchant"
            className="text-xs font-bold uppercase tracking-wider text-gray-600"
          >
            Nama Merchant
          </label>
          <input
            type="text"
            id="namaMerchant"
            value={namaToko}
            onChange={(e) => setNamaToko(e.target.value)}
            placeholder="Toko Kelontong..."
            className="rounded-xl border-2 border-black p-3 font-medium bg-gray-50 focus:outline-none focus:bg-amber-50"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="totalBelanja"
            className="text-xs font-bold uppercase tracking-wider text-gray-600"
          >
            Total Belanja
          </label>
          <input
            type="number"
            id="totalBelanja"
            value={totalBelanja}
            onChange={(e) => setTotalBelanja(e.target.value)}
            placeholder="0"
            className="rounded-xl border-2 border-black p-3 font-bold bg-gray-50 focus:outline-none focus:bg-amber-50"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-2 bg-slate-900 rounded-xl p-3 font-bold text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-800 transition-all active:translate-y-0.5 active:shadow-none"
        >
          Simpan Transaksi
        </button>
        <button
          className="w-full mt-2 bg-pink-500 rounded-xl p-3 font-bold text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-800 transition-all active:translate-y-0.5 active:shadow-none"
          onClick={()=>{
            setTambahManual(false);
          }}
        >
          Batal
        </button>
      </form>
    </div>
  );
}

export default InserManual;
