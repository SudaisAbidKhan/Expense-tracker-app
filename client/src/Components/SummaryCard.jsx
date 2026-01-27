import React from "react";

const SummaryCard = ({ title, amount, id }) => {
  let stylebg;
  if (id === 1) {
    stylebg = "bg-gradient-to-br from-green-500 to-emerald-500 text-white";
  } else if (id === 2) {
    stylebg = "bg-gradient-to-br from-red-500 to-orange-500 text-white";
  } else if (id === 3) {
    stylebg = "bg-gradient-to-br from-purple-500 to-blue-500 text-white";
  }

  return (
    <div>
      <div
        className={`p-6 ${stylebg} rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow flex gap-5 flex-col`}
      >
        <p
          className="text-sm opacity-90 mb-1"
        >
          {title}
        </p>
        <p className="text-4xl">
          PKR {amount}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
