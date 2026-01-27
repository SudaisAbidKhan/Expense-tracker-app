import React, { useContext } from "react";
import Title from "../Components/Title";
import StatCard from "../Components/StatCard";
import { Calendar, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import GraphCard from "../Components/GraphCard";
import RecentTransaction from "../Components/RecentTransaction";
import { ExpenseContext } from "../Context/ExpenseContext";
import { useEffect } from "react";

const Home = () => {
  const { transactions, totalIncome, totalExpenses, totalBalance, setSelectedType, setSelectedMonth, setSelectedCategory} =
    useContext(ExpenseContext);

    useEffect(() => {
    setSelectedType("all");
    setSelectedMonth("all");
    setSelectedCategory("all");
  }, []);

  const cardItems = [
    { id: 1, Icon: Wallet, title: "Total Balance", amount: totalBalance },
    {
      id: 2,
      Icon: TrendingUp,
      title: "Total Income",
      subtitle: "This Month",
      amount: totalIncome,
    },
    {
      id: 3,
      Icon: TrendingDown,
      title: "Total Expense",
      subtitle: "This Month",
      amount: totalExpenses,
    },
    {
      id: 4,
      Icon: Calendar,
      title: "Transactions",
      subtitle: "All Time",
      times: transactions,
    },
  ];

  return (
    <div>
      <Title
        heading="Dashboard"
        text="Welcome back! Here's your financial overview"
      />

      {/* Dashboard Cards  */}
      <div className="mt-6 flex gap-5 mx-4 flex-wrap">
        {cardItems.map((items) => (
          <StatCard
            key={items.id}
            id={items.id}
            Icon={items.Icon}
            title={items.title}
            subtitle={items.subtitle}
            amount={items.amount}
            first={items.first}
            times={items.times}
          />
        ))}
      </div>

      {/* Graph Card  */}
      <div className="mt-6 flex gap-5 mx-4 flex-wrap">
        <GraphCard title={"6-Month Trend"} type={"bar"} />
        <GraphCard title={"Expense Categories"} type={"pie"} />
      </div>

      {/* Recent Transactions  */}
      <div className="mt-6 flex gap-5 mx-4 flex-wrap">
        <RecentTransaction title={"Recent Transaction"} />
      </div>
    </div>
  );
};

export default Home;
