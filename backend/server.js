import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

// ✅ Define Allowed Origins (Frontend URLs)
const allowedOrigins = [
  "http://localhost:5173", // Local frontend (Vite)
  "https://expense-tracker-h3jgxbt5j-expense-trackers-projects-3f794ac3.vercel.app" // Vercel frontend
];

// ✅ CORS Middleware with Debugging
app.use((req, res, next) => {
  const origin = req.get("Origin"); // Get request origin
  console.log(`🌍 Incoming Request from: ${origin}`);

  if (!origin || allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    
    if (req.method === "OPTIONS") {
      return res.sendStatus(200); // Handle preflight requests
    }
    
    next();
  } else {
    console.warn(`❌ Blocked CORS Request from: ${origin}`);
    res.status(403).json({ message: "CORS policy does not allow this origin" });
  }
});

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use("/api/transactions", transactionRoutes);
app.use(errorHandler);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
