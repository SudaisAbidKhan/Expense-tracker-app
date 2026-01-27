import React, { useContext } from "react";
import { useState } from "react";
import { Filter } from "lucide-react";
import { ExpenseContext } from "../Context/ExpenseContext";

const TransactionFilter = () => {
  const {
    selectedType,
    setSelectedType,
    selectedMonth,
    setSelectedMonth,
    selectedCategory,
    setSelectedCategory,
  } = useContext(ExpenseContext);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const categories = [
    "Food & Dining",
    "Shopping",
    "Transportation",
    "Bills & Utilities",
    "Entertainment",
    "Healthcare",
    "Education",
    "Travel",
    "Salary",
    "Freelance",
    "Business",
    "Investment",
    "Gift",
    "Other",
  ];

  return (
    <div className="w-64 p-4 bg-white rounded-xl shadow">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-purple-600" />
        <h2 className="text-lg font-medium text-gray-800">Filters</h2>
      </div>

      {/* Type Filter */}
      <div className="mb-4">
        <label className="text-sm text-gray-600 mb-2 block">Type</label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* Month Filter */}
      <div className="mb-4">
        <label className="text-sm text-gray-600 mb-2 block">Month</label>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">All Months</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Category Filter */}
      <div>
        <label className="text-sm text-gray-600 mb-2 block">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TransactionFilter;
