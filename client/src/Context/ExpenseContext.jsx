import { useState, useEffect, createContext } from "react";
import React from "react";
import axios from "axios";
import api from "../api/axiosConfig.js";

export const ExpenseContext = createContext();

const ExpenseProvider = ({ children }) => {
  const [allTransaction, setAllTransaction] = useState(null); // Change to null
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/get-transactions");

        setAllTransaction(res.data.transactions || []);
      } catch (err) {
        console.error("Error:", err); // Change this
        setAllTransaction([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !allTransaction) {
    return <div>Loading...</div>;
  }

  const transactions = allTransaction.length || 0;

  const totalIncome =
    allTransaction
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + Number(item.amount), 0) || 0;

  const totalExpenses =
    allTransaction
      .filter((item) => item.type === "expense")
      .reduce((sum, item) => sum + Number(item.amount), 0) || 0;

  const totalBalance = totalIncome - totalExpenses;

  return (
    <ExpenseContext.Provider
      value={{
        allTransaction,
        setAllTransaction,
        transactions,
        totalIncome,
        totalExpenses,
        totalBalance,
        selectedType,
        setSelectedType,
        selectedMonth,
        setSelectedMonth,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;
