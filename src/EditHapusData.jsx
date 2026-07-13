import React from "react";
import { supabase } from "./supabase";

function EditHapus({
  detail,
  setNamaToko,
  setTotalBelanja,
  namaToko,
  totalBelanja,
  setDetail,
  id,
  recipt
}) {
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
      .update([
        {
          merchant_name: namaToko || "Tanpa Nama",
          total_amount: Number(totalBelanja || 0),
          date: new Date().toISOString().split("T")[0],
        },
      ])
      .eq("id", id);

    if (error) {
      console.error("Gagal store data:", error.message);
      alert(`Eror : ${error.message}`);
    } else {
      setDetail(false);
      window.location.reload();
    }
  };

  const handleDelete = async (event) => {

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
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Gagal store data:", error.message);
      alert(`Eror : ${error.message}`);
    } else {
      setDetail(false);
      window.location.reload();
    }
  };
  return (
    <>
      <div className="m-5 rounded-2xl  bg-white/20 backdrop-blur-sm p-5 text-white shadow-md font-mono">
        <div className="mb-4 font-bold text-lg text-center border-black text-white">
          Edit Transaksi
        </div>

        <form onSubmit={handleSimpanTransaksi} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="namaMerchant"
              className="text-xs font-bold uppercase tracking-wider text-white"
            >
              Nama Merchant
            </label>
            <input
              type="text"
              id="namaMerchant"
              value={namaToko}
              onChange={(e) => setNamaToko(e.target.value)}
              placeholder="Toko Jejep"
              className="rounded-xl text-black p-3 font-medium bg-gray-50 focus:outline-none focus:bg-amber-50"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="totalBelanja"
              className="text-xs font-bold uppercase tracking-wider text-white"
            >
              Total Belanja
            </label>
            <input
              type="number"
              id="totalBelanja"
              value={totalBelanja}
              onChange={(e) => setTotalBelanja(e.target.value)}
              placeholder="0"
              className="rounded-xl text-black p-3 font-bold bg-gray-50 focus:outline-none focus:bg-amber-50"
              required
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="w-full mt-2 bg-slate-900 rounded-xl p-3 font-bold text-white  shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-800 transition-all active:translate-y-0.5 active:shadow-none"
            >
              Edit
            </button>
            <button
              onClick={()=>{
                handleDelete()
              }}
              className="w-full mt-2 bg-slate-900 rounded-xl p-3 font-bold text-white  shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-800 transition-all active:translate-y-0.5 active:shadow-none"
            >
              Hapus
            </button>
          </div>
          <button
            className="w-full mt-2 bg-[#D23B7B] rounded-xl p-3 font-bold text-white  shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-800 transition-all active:translate-y-0.5 active:shadow-none"
            onClick={() => {
              setDetail(false);
            }}
          >
            Batal
          </button>
          <div className="p-2">
            <img src={recipt} alt="" />
          </div>
        </form>
      </div>
    </>
  );
}
export default EditHapus;
