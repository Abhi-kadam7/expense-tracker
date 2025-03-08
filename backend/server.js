import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors({
    origin: "https://expense-tracker-bc8keu11w-expense-trackers-projects-3f794ac3.vercel.app/", // Allow only your frontend
    methods: "GET,POST,DELETE",
    credentials: true
  }));
  app.use(express.json());

app.use("/api/transactions", transactionRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
