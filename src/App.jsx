import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import React from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import { FaFileUpload } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";

import FooterAndHeader from "./FooterAndHeader.jsx";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const navigate = useNavigate();
  const [previewFoto, setPreviewFoto] = useState(null);
  const [image, setImage] = useState(null);
  const [todos, setTodos] = useState([]);
  const [foto, setFoto] = useState(null);
  const [namaFile, setNamaFile] = useState("Ambil foto/pilih dari galeri");
  if (image != null) console.log("file di memori reeact" + image);

  const videoConstraints = {
    width: { ideal: 960 },
    height: { ideal: 720 },
    facingMode: "environment",
  };
  function base64ToFile(base64Data, filename = "webcam_snap.jpg") {
    const arr = base64Data.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
  const WebcamCapture = () => {
    const webcamRef = React.useRef(null);
    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc != null) {
        // const fotoMurni = base64ToBlob(imageSrc);
        // setFoto(fotoMurni);
        setPreviewFoto(imageSrc);
        const fotoImg = base64ToFile(imageSrc);
        setFoto(fotoImg);
      }
    }, [webcamRef]);

    return (
      <>
        <div className=" relative flex flex-col">
          <Webcam
            audio={false}
            // height={1280}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            // width={720}
            videoConstraints={videoConstraints}
            className=" aspect-auto h-fit"
          />
          <div className=" absolute bottom-10 right-0 left-0 flex justify-center items- gap-3">
            <button
              onClick={capture}
              className=" bg-gray-700 p-5 text-white text-center rounded-xl"
            >
              <div className="flex gap-3">
                <FaCamera className="text-xl" /> <p>Ambil Gambar</p>
              </div>
            </button>
          </div>
        </div>
      </>
    );
  };

  useEffect(() => {
    async function getTodos() {
      const { data: todos } = await supabase.from("todos").select();

      if (todos) {
        setTodos(todos);
      }
    }

    getTodos();
  }, []);
  useEffect(() => {
    if (foto != null) {
      setImage(foto);
    }
  }, [foto]);

  async function uplaodFoto(file) {
    // if (foto === null) {
    //   // alert("pilih foto dulu")

    // }

    const namaFile = `${Date.now()}`;
    const { data, error } = await supabase.storage
      .from("Recipt")
      .upload(namaFile, image);
    if (error) {
      alert("gagal upload");
      console.error(storageError);
    } else {
      alert("oke");
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
        alert(`Toko: ${deno.merchantName}, Total: Rp ${deno.totalAmount}`);
      } catch (err) {
        console.error("error:", err);
        alert("error!");
      }
    }
  }
  console.log(image);
  return (
    <div className=" min-h-screen text-black flex flex-col relative max-w-xl">
      <FooterAndHeader />
      <div className="sticky top-0 left-0 right-0 z-10">
        <WebcamCapture />
      </div>

      {/* main section */}
      <div className=" relative bg-white rounded-t-4xl mt-[-25px] z-20 ">
        <div className="flex justify-center m-3">
          <div className="bg-black/20 rounded-full w-34">
            <p className="p-1"></p>
          </div>
        </div>

        <div className="flex justify-center my-5">
          <div className="flex justify-center gap-5 items-center bg-gray-900 p-4 rounded-xl w-fit">
            <div className="bg-gray-500 hover:bg-gray-900 flex justify-center items-center rounded-xl">
              <label
                htmlFor="foto-recipt"
                className="flex items-center justify-center p-4"
              >
                <FaFileUpload className="text-xl text-white " />
              </label>
            </div>
            {namaFile && <span className="text-white">{namaFile}</span>}
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
              className=" bg-white rounded-xl p-4 hover:bg-gray-500 hover:text-white"
              onClick={uplaodFoto}
            >
              Upload
            </button>
          </div>
        </div>

        <div className="m-10">
          {previewFoto && (
            <div className="flex justify-center">
              <img src={previewFoto} className="" />
            </div>
          )}
        </div>

        <footer class="flex justify-center p-3 opacity-50 text-xs mb-40">
          &copy; 2026 Aditya Arrofi. All Rights Reserved
        </footer>
      </div>

      {/* <ul className="text-white">
        {todos.map((todo) => (
          <li key={todo.id}>{todo.Nama}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default App;
