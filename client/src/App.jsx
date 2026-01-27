import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Transactions from "./Pages/Transactions";
import Summary from "./Pages/Summary";
import AddTransaction from "./Pages/AddTransaction";
import Sidebar from "./Components/Sidebar";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="flex gap-4 min-h-screen bg-gray-50">
      <Sidebar />
       <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex-1 mt-8">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
