import express from "express";
import Donation from "../models/Donation.js";

const router = express.Router();

// Create a new donation
router.post("/", async (req, res) => {
  try {
    const { amount, fullName, email, phone, message } = req.body;

    // Validate required fields
    if (!amount || !fullName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Create new donation
    const donation = new Donation({
      amount,
      fullName,
      email,
      phone,
      message,
      status: "pending",
    });

    await donation.save();

    res.status(201).json({
      success: true,
      message: "Donation recorded successfully",
      donation,
    });
  } catch (error) {
    console.error("Donation error:", error);
    res.status(500).json({
      success: false,
      message: "Server error processing donation",
    });
  }
});

export default router;
