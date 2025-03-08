import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

// ✅ Allow Vercel Frontend
const allowedOrigins = [
  "http://localhost:5173", // Local frontend (Vite)
  "https://expense-tracker-h3jgxbt5j-expense-trackers-projects-3f794ac3.vercel.app" // Vercel frontend
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Routes
app.use("/api/transactions", transactionRoutes);
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
