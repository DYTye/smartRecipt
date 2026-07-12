import React, { useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { FaCamera } from "react-icons/fa";

function WebcamCapture({ setFoto, setPreviewFoto }) {
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
  const WebcamInternal = () => {
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
  };return <WebcamInternal />;
}
export default WebcamCapture;
