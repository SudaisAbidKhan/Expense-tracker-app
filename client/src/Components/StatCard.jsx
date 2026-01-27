import React from "react";
import { ArrowUpRight } from "lucide-react";

const StatCard = ({ Icon, title, subtitle, amount, times, id }) => {

  let styletext;
  let stylebg;
  if(id === 1){
    styletext= ""
    stylebg= "bg-white/20"
  } else if (id === 2) {
    styletext= "text-green-600"
    stylebg= "bg-green-100"
  } else if (id === 3) {
    styletext= "text-red-600"
    stylebg= "bg-red-100"
  } else {
    styletext= "text-orange-600"
    stylebg= "bg-orange-100"
  }

  return (
    <div
      className={`w-44 h-60 flex flex-col gap-5 p-6 ${
        id === 1
          ? "bg-linear-to-br from-purple-600 to-blue-600 text-white"
          : "bg-white border-2 border-gray-200 hover:shadow-lg transition-shadow"
      }  rounded-xl grow`}
    >
      <div className="flex justify-between items-center">
        <div className={`${stylebg} p-3 rounded-xl`}>
          <Icon className={`w-6 h-6 ${styletext}`} />
        </div>
        {!subtitle ? (
          <ArrowUpRight className="w-5 h-5 text-black" />
        ) : (
          <p>{subtitle}</p>
        )}
      </div>
      <p className="text-sm opacity-90 mb-1">{title}</p>
      <p className="text-3xl">{amount ? `PKR ${amount}` : times}</p>
    </div>
  );
};

export default StatCard;
