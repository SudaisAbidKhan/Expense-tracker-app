import express from 'express'
import "dotenv/config";
import connectDB from "./config/mongoDB.js";
import cors from 'cors'
import ExpenseRoute from './routes/ExpenseRoute.js';

const app = express();
connectDB();

const port = process.env.PORT || 4000;

app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);


app.get("/", (req, res) => {
  res.send("Api working");
});

app.use("/api/expense", ExpenseRoute);

app.listen(port, () => console.log(`Server started on PORT:${port}`));
