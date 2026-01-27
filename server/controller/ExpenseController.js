import mongoose from "mongoose";
import ExpenseModel from "../model/ExpenseModel.js";

export const addTransaction = async (req, res) => {
  const { type, amount, description, category, date } = req.body;

  if (!type || !amount || !description || !category || !date) {
    return res
      .status(400)
      .json({ success: false, message: "Input is missing" });
  }

  // addTransaction - better validation
  if (!["income", "expense"].includes(type)) {
    return res.status(400).json({ success: false, message: "Invalid type" });
  }
  if (typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ success: false, message: "Invalid amount" });
  }

  try {
    const newTransaction = new ExpenseModel({
      type,
      amount,
      description,
      category,
      date,
    });
    await newTransaction.save();

    return res
      .status(201)
      .json({ success: true, message: "Transaction added successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const allTransactions = await ExpenseModel.find({}, { __v: 0 });

    return res
      .status(200)
      .json({ success: true, transactions: allTransactions });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  const { _id } = req.params;

  try {
    const checkTransaction = await ExpenseModel.findByIdAndDelete(_id);

    if (!checkTransaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    }

    return res.status(200).json({
      success: true,
      message: `Transaction is deleted successfully`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
