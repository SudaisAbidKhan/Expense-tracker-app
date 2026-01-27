import { Delete, Trash, Trash2, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";
import { ExpenseContext } from "../Context/ExpenseContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import api from "../api/axiosConfig";
import { useLocation } from "react-router-dom";

const RecentTransaction = ({ title }) => {
  const {
    transactions,
    allTransaction,
    setAllTransaction,
    selectedType,
    selectedMonth,
    selectedCategory,
  } = useContext(ExpenseContext);

  const location = useLocation();

  // Combine all filters
  let filteredTransactions = allTransaction
    .filter((item) => selectedType === "all" || item.type === selectedType)
    .filter((item) => {
      if (selectedMonth === "all") return true;
      const itemMonth = new Date(item.date).toLocaleString("default", {
        month: "long",
      });
      return itemMonth === selectedMonth;
    })
    .filter(
      (item) =>
        selectedCategory === "all" || item.category === selectedCategory,
    );

  const handleTransactionDelete = async (_id) => {
    // setAllTransaction((prev) =>
    //   prev.filter((_, index) => index !== indexToDelete),
    // );

    await api.delete(`/delete-transaction/${_id}`)
    window.location.reload(location.pathname)
    toast.success("Transaction deleted");
  };

  return (
    <>
      {transactions === 0 ? (
        <div className="w-44 text-gray-500 font-semibold text-lg flex flex-col justify-center items-center gap-5 p-6 bg-white border-2 border-gray-200 rounded-xl grow mb-6">
          No transaction found
        </div>
      ) : (
        <div className="w-44 flex flex-col gap-5 p-6 bg-white border-2 border-gray-200 rounded-xl grow mb-6">
          <h2 className="text-xl text-gray-900 mb-6">{title}</h2>
          <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 rounded-lg text-sm text-gray-600">
            <div className="col-span-4">Description</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2 text-right">Amount</div>
          </div>
          <div className="flex flex-col gap-2">
            {filteredTransactions.map((item, index) => (
              <div
                key={index}
                className="md:grid md:grid-cols-12 flex flex-col gap-2 md:gap-4 px-4 py-4 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100"
              >
                <div className="md:col-span-4 flex items-center gap-3">
                  <div
                    className={`${
                      item.type === "expense" ? "bg-red-100" : "bg-green-100"
                    } p-3 rounded-xl`}
                  >
                    {item.type === "expense" ? (
                      <TrendingDown className="w-6 h-6 text-red-600" />
                    ) : (
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    )}
                  </div>
                  <span className="text-gray-900">{item.description}</span>
                </div>
                <div className="md:col-span-2 flex items-center justify-start">
                  <span className="text-sm text-gray-600">{item.category}</span>
                </div>
                <div className="md:col-span-2 flex items-center">
                  <span className="text-sm text-gray-600">{new Date(item.date).toLocaleDateString()}</span>
                </div>
                <div className="md:col-span-2 flex items-center">
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs ${
                      item.type === "expense"
                        ? "text-red-700 bg-red-100"
                        : "text-green-700 bg-green-100"
                    }`}
                  >
                    {item.type}
                  </span>
                </div>
                <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-4">
                  <span
                    className={`text-lg ${
                      item.type === "expense"
                        ? "text-red-700"
                        : "text-green-700"
                    }`}
                  >
                    PKR {item.amount}
                  </span>
                  <div onClick={() => handleTransactionDelete(item._id)} className="cursor-pointer">
                    <Trash2 className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RecentTransaction;
