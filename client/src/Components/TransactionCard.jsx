import React from "react";

const TransactionCard = ({ title, amount, times, id }) => {
  let stylebg;
  if (id === 1) {
    stylebg = "bg-white";
  } else if (id === 2) {
    stylebg = "bg-linear-to-br from-green-500 to-emerald-500 text-white";
  } else if (id === 3) {
    stylebg = "bg-linear-to-br from-red-500 to-orange-500 text-white";
  }

  return (
    <div>
      <div className={`max-sm:w-88.75 p-6 ${stylebg} rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow flex gap-5 flex-col`}>
        <p
          className={
            id === 1 ? "text-sm text-gray-600 mb-1" : "text-sm opacity-90 mb-1"
          }
        >
          {title}
        </p>
        <p className={id === 1 ? "text-3xl text-gray-900" : "text-3xl"}>
          {id === 1 ? times : `PKR ${amount}`}
        </p>
      </div>
    </div>
  );
};

export default TransactionCard;
