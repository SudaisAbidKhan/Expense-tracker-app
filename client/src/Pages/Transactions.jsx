import React from "react";
import Title from "../Components/Title";
import TransactionCard from "../Components/TransactionCard";
import RecentTransaction from "../Components/RecentTransaction";
import { useState } from "react";
import TransactionFilter from "../Components/TransactionFilter";
import { useContext } from "react";
import { ExpenseContext } from "../Context/ExpenseContext";

const Transactions = () => {
  const { transactions, totalIncome, totalExpenses, } =
    useContext(ExpenseContext);

    const {
        
      } = useContext(ExpenseContext);

  const TransactionCardItems = [
    { id: 1, title: "Total Transaction", times: transactions },
    {
      id: 2,
      title: "Total Income",
      amount: totalIncome,
    },
    {
      id: 3,
      title: "Total Expense",
      amount: totalExpenses,
    },
  ];

  return (
    <div>
      <Title
        heading="Transaction"
        text="View and manage your transaction history"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-10 mr-10">
        {TransactionCardItems.map((items) => (
          <div key={items.id}>
            <TransactionCard
              title={items.title}
              amount={items.amount}
              times={items.times}
              id={items.id}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 sm:justify-center sm:items-center">
        <div className="sm:sticky top-6 sm:self-start">
          <TransactionFilter />
        </div>
        {}
        <div className="flex gap-5 mx-4 flex-wrap grow">
          <RecentTransaction />
        </div>
      </div>
    </div>
  );
};

export default Transactions;
