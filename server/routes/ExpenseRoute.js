import express from 'express';
import { addTransaction, deleteTransaction, getTransactions } from '../controller/ExpenseController.js';

const ExpenseRoute = express.Router();

ExpenseRoute.post("/add-transaction", addTransaction);
ExpenseRoute.get("/get-transactions", getTransactions);
ExpenseRoute.delete("/delete-transaction/:_id", deleteTransaction);

export default ExpenseRoute;
