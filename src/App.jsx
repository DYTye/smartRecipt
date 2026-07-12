import { useState, useEffect } from "react";
import { supabase } from "./supabase.js";
import React from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import { FaFileUpload } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import FooterAndHeader from "./Footer.jsx";
import WebcamCapture from "./WebcamCapture.jsx";

function App() {
  const navigate = useNavigate();
  const [previewFoto, setPreviewFoto] = useState(null);
  const [image, setImage] = useState(null);
  const [foto, setFoto] = useState(null);
  const [namaFile, setNamaFile] = useState("Ambil foto/pilih dari galeri");
  const [namaToko, setNamaToko] = useState();
  const [totalBelanja, setTotalBelanja] = useState();
  const [loading, setLoading] = useState(false);
  if (image != null) console.log("file di memori reeact" + image);

  useEffect(() => {
    if (foto != null) {
      setImage(foto);
    }
  }, [foto]);

  async function uplaodFoto(file) {
    // if (foto === null) {
    //   // alert("pilih foto dulu")
    // }
    setLoading(true);
    const namaFile = `${Date.now()}`;
    const { data, error } = await supabase.storage
      .from("Recipt")
      .upload(namaFile, image);
    if (error) {
      alert("gagal upload");
      console.error(storageError);
      setLoading(false);
    } else {
      try {
        const { data: urlData } = supabase.storage
          .from("Recipt")
          .getPublicUrl(namaFile);

        const linkGambaMurni = urlData.publicUrl;
        console.log("url:", linkGambaMurni);

        const { data: deno, error: errorDeno } =
          await supabase.functions.invoke("super-api", {
            body: { imageUrl: linkGambaMurni },
          });

        if (errorDeno) throw errorDeno;
        console.log("hasil gemini", deno);
        // alert(`Toko: ${deno.merchantName}, Total: Rp ${deno.totalAmount}`);
        setTotalBelanja(deno.totalAmount);
        setNamaToko(deno.merchantName);
      } catch (err) {
        console.error("error:", err);
        alert("error!");
      } finally {
        setLoading(false);
      }
    }
  }
  const handleSimpanTransaksi = async (event) => {
    event.preventDefault();

    // 1. Ambiak data user aktif langsung dari auth Supabase
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      alert("Jalurnyo putuih, Bre! Ang musti login ulang dulu.");
      return;
    }

    // DEBUG JALUR: Pantiang untuak melacak kok ado properti nan kosong
    console.log("USER ID:", user.id);
    console.log("NAMA TOKO:", namaToko);
    console.log("TOTAL BELANJA:", totalBelanja);

    // 2. Tembak data murni dangan sintaks standard pabrik Supabase
    const { data, error } = await supabase
      .from("transactions")
      .insert([
        {
          merchant_name: namaToko || "Tanpa Nama",
          total_amount: Number(totalBelanja || 0),
          date: new Date().toISOString().split("T")[0],
          image_url: "https://link-foto.com",
          user_id: user.id, 
        },
      ])
      .select();

    if (error) {
      console.error("Gagal store data, Bre:", error.message);
      alert(`Eror muko dapuah db: ${error.message}`);
    } else {
      alert("Transaksi rasmi tasimpan gariang!");
      navigate("/Home");
    }
  };

  // console.log(image);
  return (
    <div className=" min-h-screen text-amber-100 bg-[#26282a]  flex flex-col relative max-w-xl">
      <FooterAndHeader />
      <div className="sticky top-0 left-0 right-0 z-10">
        <WebcamCapture setFoto={setFoto} setPreviewFoto={setPreviewFoto} />
      </div>

      {/* main section */}
      <div className=" relative bg-[#26282a] rounded-t-4xl mt-[-25px] z-20 ">
        <div className="flex justify-center m-3">
          <div className="bg-black/20 rounded-full w-34">
            <p className="p-1"></p>
          </div>
        </div>

        <div className="flex justify-center my-5">
          <div className="flex justify-center gap-5 items-center bg-black/20 p-4 rounded-xl w-fit mx-5">
            <div className="bg-white text-black hover:bg-gray-900 flex justify-center items-center rounded-xl">
              <label
                htmlFor="foto-recipt"
                className="flex items-center justify-center p-4"
              >
                <FaFileUpload className="text-xl  " />
              </label>
            </div>
            {namaFile && <span className="">{namaFile}</span>}
            <input
              id="foto-recipt"
              type="file"
              className="hidden"
              onChange={(e) => {
                const pilihFoto = e.target.files?.[0];
                if (pilihFoto) {
                  setImage(pilihFoto);
                  setNamaFile(pilihFoto.name);
                }
              }}
            />

            <button
              disabled={loading}
              className="bg-white rounded-xl p-4 text-gray-900 font-bold hover:bg-gray-500 hover:text-white disabled:opacity-50 transition-all"
              onClick={uplaodFoto}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-900 border-t-transparent"></span>
                  Proses...
                </span>
              ) : (
                "Upload"
              )}
            </button>
          </div>
        </div>

        <div className="m-10">
          {previewFoto && (
            <div className="flex justify-center animate-[scaleIn_0.3s_ease-out]">
              <img src={previewFoto} className="rounded-xl" />
            </div>
          )}
        </div>

        {namaToko && totalBelanja && (
          <div className="m-5">
            <p className="bg-green-600 w-fit p-1 rounded-xl text-white mb-3 ">
              Output AI :{" "}
            </p>
            <div className="flex justify-between text-xl">
              <p>{namaToko}</p>
              <p>Rp.{totalBelanja}</p>
            </div>
            <hr />

            <div className="text-center">
              {" "}
              <button
                onClick={handleSimpanTransaksi}
                className="mt-3 bg-gray-900 rounded-xl p-3 text-bold text-white"
              >
                Konfirmasi
              </button>
            </div>
          </div>
        )}

     
      </div>
         <footer className="flex justify-center p-3 opacity-50 text-xs mb-40">
          &copy; 2026 Aditya Arrofi. All Rights Reserved
        </footer>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

export default App;
