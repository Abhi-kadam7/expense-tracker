import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

// ✅ Allowed Frontend URLs
const allowedOrigins = [
  "http://localhost:5173", // Local frontend (Vite)
  "https://expense-tracker-5mjknvfq1-expense-trackers-projects-3f794ac3.vercel.app" // Correct Vercel URL
];

// ✅ CORS Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`❌ Blocked CORS Request from: ${origin}`);
        callback(new Error("CORS policy does not allow this origin"), false);
      }
    },
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use("/api/transactions", transactionRoutes);
app.use(errorHandler);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
