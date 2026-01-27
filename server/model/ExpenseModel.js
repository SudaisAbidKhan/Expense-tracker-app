import mongoose from "mongoose";

export const ExpenseSchema = new mongoose.Schema({
    type: {type: String, required: true},
    amount: {type: Number, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    date: {type: Date, required: true, default: Date.now},
})

const ExpenseModel = mongoose.models.expense || mongoose.model("expense", ExpenseSchema)

export default ExpenseModel;
