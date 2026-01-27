import React from "react";
import {
  Home,
  HomeIcon,
  List,
  Menu,
  PieChart,
  Plus,
  SidebarIcon,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState("home");
  const [hidden, setHidden] = useState(false);

  const location = useLocation();

  const navItems = [
    { id: "transactions", Icon: List, label: "Transactions" },
    { id: "summary", Icon: PieChart, label: "Summary" },
  ];

  const handleSidebar = () => {
    setHidden(!hidden);
  };

  return (
    <>
      <div onClick={handleSidebar} className="sm:hidden absolute right-2 top-5">
        <Menu />
      </div>

      <div
        className={`max-sm:absolute max-sm:z-10 w-72 bg-white border-r border-gray-200 h-screen flex flex-col border-b transform transition-transform duration-300 ease-in-out ${
          hidden ? "max-sm:-translate-x-80" : "translate-x-0"
        }`}
      >
        <nav className="h-full">
          {/* Logo  */}
          <div className="flex justify-start items-center gap-4 p-6 border-b border-gray-200">
            <div className="bg-linear-to-r from-purple-600 to-blue-600 p-2.5 rounded-xl">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl text-gray-900">Expense Tracker</h2>
              <p className="text-xs text-gray-500">Manage your finances</p>
            </div>
          </div>

          <div className="p-6 flex flex-col items-center gap-4 border-b border-gray-200">
            <div
              onClick={() => {
                navigate("home");
                setIsActive("");
                setHidden(!hidden);
              }}
              className={`w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                location.pathname === "/home"
                  ? "bg-linear-to-r from-purple-600 to-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div>
                <HomeIcon className="w-6 h-6" />
              </div>
              <h2>Dashboard</h2>
            </div>
            {navItems.map((items, index) => {
              const Icon = items.Icon;
              return (
                <div
                  key={index}
                  onClick={() => {
                    navigate(items.id);
                    setHidden(!hidden);
                    setIsActive(items.id);
                  }}
                  className={`w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive === items.id
                      ? "bg-linear-to-r from-purple-600 to-blue-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2>{items.label}</h2>
                </div>
              );
            })}
          </div>
          <div className="p-6 cursor-pointer">
            <div
              onClick={() => {
                setIsActive("");
                setHidden(!hidden);
                navigate("add-transaction");
              }}
              className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-orange-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-shadow"
            >
              <Plus className="w-5 h-5" />
              <span>Add Transaction</span>
            </div>
          </div>
        </nav>

        <div className="mt-auto p-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            © 2026 Expense Tracker
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
