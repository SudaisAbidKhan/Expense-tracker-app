import React, { useState } from "react";

const months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

const getMonthLabel = (month) => {
  const date = new Date(2026, parseInt(month) - 1, 1);
  return date.toLocaleString("default", { month: "long" });
};

const SummaryFilter = () => {
  const [selectedMonth, setSelectedMonth] = useState("all");

  return (
    <div className="mb-4 max-w-xs mt-5">
      <label className="block text-sm text-gray-600 mb-2 font-semibold">Select Period</label>
      <div className="relative">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="w-full h-12 px-4 pr-10 border rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
        >
          <option value="all">All Time</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {getMonthLabel(month)}
            </option>
          ))}
        </select>
        {/* Down arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SummaryFilter;
