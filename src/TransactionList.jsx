import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Detail from "./EditHapusData.jsx";

function TransactionList({ transactions }) {
  const navigate = useNavigate();
  const [namaToko, setNamaToko] = useState("");
  const [totalBelanja, setTotalBelanja] = useState("");
  const [detail, setDetail] = useState(false);
  const [id,setId] = useState();
  const [recipt, setRecipt] = useState();
  console.log(namaToko);
  console.log(detail);
  
  return (
    <div className="flex flex-col bg-[#26282a] w-full rounded-4xl text-amber-100 -mt-7 relative z-20">
      <p className="mt-5 mx-auto font-light bg-gray-200 rounded-full px-2 py-1 w-25 text-xs shadow-xl shadow-amber-50"></p>
      {transactions.map((item, index) => {
        return (
          <React.Fragment key={item.id || index}>
            <button
              onClick={() => {setDetail(true);
                setNamaToko(item.merchant_name);
                setTotalBelanja(item.total_amount);
                setId(item.id);
                setRecipt(item.image_url);}
              }
              className="w-full text-left block clear-both"
            >
              <div className="flex justify-between m-1 ring-1s bg-black/10 ring-black/70 p-5 rounded-xl shadow-xl">
                <div>
                  <p>{item.merchant_name || "Tanpa Nama"}</p>
                  <p className="font-extralight">{item.date || "-"}</p>
                </div>
                <p className="font-bold">
                  Rp.{Number(item.total_amount || 0).toLocaleString("id-ID")}
                </p>
                {/* <p>{item.image_url}</p> */}
              </div>
            </button>
          </React.Fragment>
        );
      })}
      {detail && (
        <div className="fixed inset-0 flex justify-center items-center  z-40 bg-black/50 backdrop-blur-sm">
          <div className="animasi-masuak">
            <Detail setDetail={setDetail} setNamaToko={setNamaToko} setTotalBelanja={setTotalBelanja} namaToko={namaToko} totalBelanja={totalBelanja} id={id} recipt={recipt}/>
          </div>
        </div>
      )}
    </div>
  );
}
export default TransactionList;
