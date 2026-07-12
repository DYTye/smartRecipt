import React from "react";

function TransactionList({ transactions }) {
  return (
    <div className="flex flex-col bg-[#26282a] w-full rounded-4xl text-amber-100 -mt-7 relative z-20">
      <p className="mt-5 mx-auto font-light bg-gray-200 rounded-full px-2 py-1 w-25 text-xs shadow-xl shadow-amber-50"></p>
      {transactions.map((item, index) => {
        return (
          <React.Fragment key={item.id || index}>
            <a href={item.image_url}>
              <div className="flex justify-between m-2 ring-1s ring-black/70 p-5 rounded-xl shadow-xl">
                <div>
                  <p>{item.merchant_name || "Tanpa Nama"}</p>
                  <p className="font-extralight">{item.date || "-"}</p>
                </div>
                <p className="font-bold">
                  Rp.{Number(item.total_amount || 0).toLocaleString("id-ID")}
                </p>
                {/* <p>{item.image_url}</p> */}
              </div>
            </a>
          </React.Fragment>
        );
      })}
    </div>
  );
}
export default TransactionList;
