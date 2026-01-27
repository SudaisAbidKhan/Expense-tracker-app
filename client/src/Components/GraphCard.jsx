import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { useContext } from "react";
import { ExpenseContext } from "../Context/ExpenseContext";

import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
);

const GraphCard = ({ title, type }) => {
  const { allTransaction } = useContext(ExpenseContext);

  // Calculate monthly income and expenses
  const monthlyData = allTransaction.reduce((acc, item) => {
    const month = new Date(item.date).toLocaleString("default", {
      month: "short",
    });
    if (!acc[month]) {
      acc[month] = { income: 0, expense: 0 };
    }
    if (item.type === "income") {
      acc[month].income += Number(item.amount);
    } else {
      acc[month].expense += Number(item.amount);
    }
    return acc;
  }, {});

  const months = Object.keys(monthlyData);
  const incomeData = months.map((month) => monthlyData[month].income);
  const expenseData = months.map((month) => monthlyData[month].expense);

  const barData = {
    labels: months,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "#10b981",
        barThickness: 20,
        borderRadius: 8,
      },
      {
        label: "Expense",
        data: expenseData,
        backgroundColor: "#ef4444",
        barThickness: 20,
        borderRadius: 8,
      },
    ],
  };

  // Calculate expense by category
  const expenseByCategory = allTransaction
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => {
      const category = item.category;
      acc[category] = (acc[category] || 0) + Number(item.amount);
      return acc;
    }, {});

  const categories = Object.keys(expenseByCategory);
  const categoryAmounts = Object.values(expenseByCategory);

  const colors = [
    "#ef4444",
    "#3b82f6",
    "#fbbf24",
    "#10b981",
    "#8b5cf6",
    "#ec4899",
    "#f97316",
    "#06b6d4",
    "#ff69c9",
  ];

  const pieData = {
    labels: categories,
    datasets: [
      {
        data: categoryAmounts,
        backgroundColor: colors.slice(0, categories.length),
      },
    ],
  };

  return (
    <div className="w-44 h-96 flex flex-col gap-5 p-6 bg-white border-2 border-gray-200 rounded-xl grow">
      <h2 className="text-xl text-gray-900 mb-6">{title}</h2>
      {type === "bar" ? (
        <Bar data={barData} />
      ) : (
        <div className="h-64 w-64">
          <Pie data={pieData} />
        </div>
      )}
    </div>
  );
};

export default GraphCard;
