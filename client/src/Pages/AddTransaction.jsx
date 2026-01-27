import React, { useContext } from "react";
import Title from "../Components/Title";
import { useState } from "react";
import { DollarSign } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { ExpenseContext } from "../Context/ExpenseContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

const AddTransaction = () => {
  const [income, setIncome] = useState(true);
  const [expense, setExpense] = useState(false);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("income");

  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [selected, setSelected] = useState("");

  const { allTransaction, setAllTransaction} =
    useContext(ExpenseContext);

  const navigate = useNavigate();

  const isDisable = amount && desc && selected;

  const ExpenseCategories = [
    { id: 1, name: "Food & Dining" },
    { id: 2, name: "Shopping" },
    { id: 3, name: "Transportation" },
    { id: 4, name: "Bills & Utilities" },
    { id: 5, name: "Entertainment" },
    { id: 6, name: "Healthcare" },
    { id: 7, name: "Education" },
    { id: 8, name: "Travel" },
    { id: 9, name: "Other" },
  ];

  const IncomeCategories = [
    { id: 1, name: "Salary" },
    { id: 2, name: "Freelance" },
    { id: 3, name: "Business" },
    { id: 4, name: "Investment" },
    { id: 5, name: "Gift" },
    { id: 6, name: "Other" },
  ];

  const handlesIncomeClicked = () => {
    setIncome(true);
    setType("income");
    setExpense(false);
  };
  const handlesExpenseClicked = () => {
    setExpense(true);
    setType("expense");
    setIncome(false);
  };

  const handleSubmit = async () => {
    const newTransaction = {
      type,
      amount: parseFloat(amount),
      category: selected,
      description: desc,
      date,
    };
    // setAllTransaction((prev) => [...prev, newTransaction]);

    await api.post("/add-transaction", newTransaction)

    toast.success(
      type.charAt(0).toUpperCase() + type.slice(1) + " Added successfully!",
    );

    setAmount("");
    setDesc("");
    setSelected("");
    // navigate("/home");
    window.location.href = "/home"
    console.log(allTransaction);
  };

  return (
    <div>
      <Title heading="Add Transaction" text="Record a new income or expense" />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* Type  */}
        <div className="mt-10">
          <h2 className="text-gray-600 font-semibold text-lg">Type</h2>
          <div className="font-semibold flex gap-2 bg-gray-200 w-1/2 py-2 px-2 rounded-2xl justify-around items-center mt-5 transition-all duration-300 ease-in-out">
            <span
              onClick={handlesIncomeClicked}
              className={`w-1/2 cursor-pointer p-4 text-center rounded-xl transition-all duration-300 ease-in-out ${income ? "bg-green-500 text-white scale-100" : "hover:bg-gray-300 text-black"}`}
            >
              Income
            </span>

            <span
              onClick={handlesExpenseClicked}
              className={`w-1/2 cursor-pointer p-4 text-center rounded-xl transition-all duration-300 ease-in-out ${expense ? "bg-orange-500 text-white scale-100" : "hover:bg-gray-300 text-black"} `}
            >
              Expense
            </span>
          </div>
        </div>

        {/* Amount  */}
        <div className="mt-10">
          <h2 className="text-gray-600 font-semibold text-lg mb-2">Amount</h2>
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              className="pl-12 h-14 text-lg rounded-xl border-2 border-gray-400 focus:border-2 focus:border-purple-500 w-80 sm:w-96"
            />
          </div>
        </div>

        {/* Category  */}
        <div className="mt-10 w-80 sm:w-96">
          <h2 className="text-gray-600 font-semibold text-lg mb-2">Category</h2>

          <div className="relative">
            <div
              onClick={() => setOpen(!open)}
              className="w-full h-14 px-4 text-lg rounded-xl border-2 border-gray-400
                     flex justify-between items-center
                     focus:border-purple-500 transition-all duration-300"
            >
              {selected || "Select category"}
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </div>

            <div
              className={`absolute z-10 w-full mt-2 rounded-xl border border-gray-300 bg-white overflow-scroll transition-all duration-300 ${open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
            >
              {income
                ? IncomeCategories.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelected(item.name);
                        setOpen(false);
                      }}
                    >
                      {item.name}
                    </div>
                  ))
                : ExpenseCategories.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelected(item.name);
                        setOpen(false);
                      }}
                    >
                      {item.name}
                    </div>
                  ))}
            </div>
          </div>
        </div>

        {/* Description  */}
        <div className="mt-10">
          <h2 className="text-gray-600 font-semibold text-lg mb-2">
            Description
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter Description"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              className="pl-4 h-14 text-lg rounded-xl border-2 border-gray-400 focus:border-2 focus:border-purple-500 w-80 sm:w-96"
            />
          </div>
        </div>

        {/* Date  */}
        <div className="mt-10">
          <h2 className="text-gray-600 font-semibold text-lg mb-2">Date</h2>
          <div className="relative">
            <input
              type="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              // defaultValue={new Date().toISOString().split("T")[0]}
              className="px-4 h-14 text-lg rounded-xl border-2 border-gray-400 focus:border-purple-500 w-80 sm:w-96"
            />
          </div>
        </div>

        <div className="my-10 w-80 sm:w-96">
          <button
            type="submit"
            disabled={!isDisable}
            className={`w-full h-14 rounded-2xl text-lg shadow-lg cursor-pointer ${
              type === "income"
                ? "bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                : "bg-linear-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
            }`}
          >
            Add {type === "income" ? "Income" : "Expense"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransaction;
