import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer.jsx";
import { supabase } from "./supabase.js";
import AOS from "aos";
import "aos/dist/aos.css";

function Account({ setProfil, userEmail, userName }) {
  AOS.init();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Gagal log out:", error.message);
      } else {
        console.log("Log out barasia!");

        navigate("/");
      }
    } catch (err) {
      console.error("Terjadi kesalahan sistem:", err);
    }
  };
  return (
    <>
      <div className="font-mono">
        <div className="flex justify-center w-auto lg:w-fit mx-7 lg:mx-auto">
          <div className="relative z-10 backdrop-blur-sm border-2 border-white p-5 my-3 rounded-xl">
            <div className="py-4">
              <div className="w-full">
                <div className="text-amber-100 font-extrabold text-center text-xl lg:text-2xl">
                  Haloooo
                </div>
                <div className="flex flex-col items-center rounded-sm">
                  <div className="h-52 w-52 lg:h-64 lg:w-64 my-0 lg:my-10">
                    <model-viewer
                      alt="duck"
                      src="https://txwatpcjenskrdnispuu.supabase.co/storage/v1/object/public/pasar3d/lowpoly_duck_animated.glb"
                      camera-controls
                      touch-action="pan-y"
                      className="w-full h-full"
                      auto-rotate
                      rotation-per-second="30deg"
                      autoplay
                      camera-orbit="45deg 60deg 3m"
                    ></model-viewer>
                  </div>
                </div>
                <div className="text-amber-100 font-bold flex flex-col gap-3 m-2">
                  <div
                    className="font-extrabold flex gap-2 items-center bg-[#D23B7B] rounded-sm p-3 w-fit"
                    id="lofi"
                  >
                    <a
                      href="https://www.flaticon.com/free-icons/duck"
                      title="duck icons"
                    >
                      <img
                        src="https://txwatpcjenskrdnispuu.supabase.co/storage/v1/object/public/pasar3d/profil.png"
                        className="h-5 w-5"
                        alt=""
                      />
                    </a>
                    {userEmail}
                  </div>
                  <div className="flex justify-center bg-black/70 rounded-md p-3">
                    <button
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      Log Out
                    </button>
                  </div>
                  <button onClick={()=>{
                    setProfil(false)
                  }} className="flex justify-center -mb-25 mt-10">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Account;
