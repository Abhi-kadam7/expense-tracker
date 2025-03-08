import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ✅ Dynamic CORS Configuration
const allowedOrigins = [
  "http://localhost:5173", // Development frontend (Vite)
  "https://expense-tracker-1-2me3.onrender.com", // 🔹 Replace with your deployed frontend URL
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

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
