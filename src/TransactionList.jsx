import React from "react";

function TransactionList({ transactions }) {
  return (
    <div className="flex flex-col bg-white w-full rounded-4xl text-black -mt-7 relative z-20">
      <p className="mt-5 mx-auto font-light bg-gray-200 rounded-full px-2 py-1 w-25 text-xs shadow-xl"></p>
      {transactions.map((item, index) => {
        return (
          <React.Fragment key={item.id || index}>
            <div className="flex justify-between m-2 ring-1s ring-black/70 p-5 rounded-xl shadow-xl">
              <div>
                <p>{item.merchant_name || "Tanpa Nama"}</p>
                <p className="font-extralight">{item.date || "-"}</p>
              </div>
              <p className="font-bold">
                Rp.{Number(item.total_amount || 0).toLocaleString("id-ID")}
              </p>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
export default TransactionList;
