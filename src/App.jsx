import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import React from "react";
import Webcam from "react-webcam";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [previewFoto, setPreviewFoto] = useState(null);
  const [image, setImage] = useState(null);
  const [todos, setTodos] = useState([]);
  const [foto, setFoto] = useState(null);
  if (image != null) console.log("file di memori reeact" + image);

  const videoConstraints = {
    width: 1280,
    height: 720,
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
        <Webcam
          audio={false}
          height={720}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
        />
        <button onClick={capture}>Capture photo</button>
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
    <>
      <div className="text-white">
        <input
          type="file"
          onChange={(e) => {
            const pilihFoto = e.target.files?.[0];
            if (pilihFoto) {
              setImage(pilihFoto);
            }
          }}
        />
        <button className="" onClick={uplaodFoto}>
          Upload
        </button>
      </div>

      <WebcamCapture />
      <img
        src={previewFoto}
        alt="Hasil Kamera"
        className="max-w-xs h-auto rounded border border-pink-5002"
      />

      <ul className="text-white">
        {todos.map((todo) => (
          <li key={todo.id}>{todo.Nama}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
