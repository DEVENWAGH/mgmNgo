import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: String,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Donation", donationSchema);
