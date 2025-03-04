import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./db.js";
import authRoutes from "./routes/auth.js";
import donationRoutes from "./routes/donations.js";
import contactRoutes from "./routes/contact.js";
import healthServicesRoutes from "./routes/healthServices.js";
import appointmentsRoute from "./routes/appointments.js";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars from the root directory
dotenv.config({ path: path.resolve(__dirname, "../..", ".env") });

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "../../public")));

// Serve static files from root directory where images are located
app.use(express.static(path.join(__dirname, "../../")));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/health-services", healthServicesRoutes);
app.use("/api/appointments", appointmentsRoute);

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});
