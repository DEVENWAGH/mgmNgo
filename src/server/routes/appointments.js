import express from "express";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// Book an appointment
router.post("/", async (req, res) => {
  try {
    console.log("Received appointment data:", req.body); // Debug log

    const {
      patientName,
      patientEmail,
      patientPhone,
      appointmentDate,
      preferredTime,
      symptoms,
    } = req.body;

    // Validate required fields
    if (
      !patientName ||
      !patientEmail ||
      !patientPhone ||
      !appointmentDate ||
      !preferredTime
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Create new appointment
    const appointment = new Appointment({
      patientName,
      patientEmail,
      patientPhone,
      appointmentDate,
      preferredTime,
      symptoms: symptoms || "",
    });

    const savedAppointment = await appointment.save();
    console.log("Saved appointment:", savedAppointment); // Debug log

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment: savedAppointment,
    });
  } catch (error) {
    console.error("Appointment error:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Error booking appointment",
    });
  }
});

// Get all appointments (for admin purposes)
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json({ success: true, appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching appointments",
    });
  }
});

export default router;
