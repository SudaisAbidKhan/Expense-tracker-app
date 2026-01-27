import React from "react";

export default function TopSpendingCategories() {
  const data = [
    { name: "Food & Dining", amount: 235.5, color: "bg-purple-500" },
    { name: "Shopping", amount: 200, color: "bg-pink-500" },
    { name: "Bills & Utilities", amount: 120, color: "bg-orange-400" },
    { name: "Healthcare", amount: 75, color: "bg-green-500" },
    { name: "Entertainment", amount: 60, color: "bg-blue-500" },
  ];

  const total = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm max-w-md border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-5">
        Top Spending Categories
      </h2>

      <div className="space-y-4">
        {data.map((item) => {
          const percentage = (item.amount / total) * 100;

          return (
            <div key={item.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">{item.name}</span>
                <span className="text-gray-600">
                  ${item.amount.toFixed(2)}
                </span>
              </div>

              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-2 rounded-full ${item.color}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
