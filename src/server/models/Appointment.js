import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
    trim: true,
  },
  patientEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  patientPhone: {
    type: String,
    required: true,
    trim: true,
  },
  appointmentDate: {
    type: String, // Changed from Date to String to handle the format better
    required: true,
  },
  preferredTime: {
    type: String,
    required: true,
    enum: ["morning", "afternoon", "evening"],
  },
  symptoms: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Appointment", appointmentSchema);
