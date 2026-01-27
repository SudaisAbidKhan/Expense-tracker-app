import React from "react";
import Title from "../Components/Title";
import SummaryFilter from "../Components/SummaryFilter";
import SummaryCard from "../Components/SummaryCard";
import GraphCard from "../Components/GraphCard";
import { ExpenseContext } from "../Context/ExpenseContext";
import { useContext } from "react";

import TopSpendingCategories from "../Components/TopSpendingCategories";

const Summary = () => {
  const { totalBalance, totalIncome, totalExpenses, allTransaction } =
    useContext(ExpenseContext);

  const SummaryCardItems = [
    {
      id: 1,
      title: "Total Income",
      amount: totalIncome,
    },
    {
      id: 2,
      title: "Total Expense",
      amount: totalExpenses,
    },
    { id: 3, title: "Net Balance", amount: totalBalance },
  ];

  return (
    <div>
      <Title
        heading="Financial Summary"
        text="Analyze your income and expenses with detailed charts"
      />

      <SummaryFilter />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-10 mr-10">
        {SummaryCardItems.map((items) => (
          <div key={items.id}>
            <SummaryCard
              title={items.title}
              amount={items.amount}
              id={items.id}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-row-reverse gap-5 mx-4 flex-wrap">
        <GraphCard title={"6-Month Trend"} type={"bar"} />
        <GraphCard title={"Expense Categories"} type={"pie"} />
      </div>

      <div className="my-5 ml-4">
        <TopSpendingCategories />
      </div>
    </div>
  );
};

export default Summary;
