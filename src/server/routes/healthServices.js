import express from "express";
import HealthService from "../models/HealthService.js";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// Get all health services
router.get("/", async (req, res) => {
  try {
    const services = await HealthService.find();
    console.log("Found services:", services.length);

    if (!services.length) {
      console.log("No services found in database");
      return res.status(404).json({
        success: false,
        message: "No healthcare services found",
      });
    }

    // Map over services to ensure consistent image paths
    const servicesWithUrls = services.map((service) => {
      const serviceObj = service.toObject();
      return {
        ...serviceObj,
        image: serviceObj.image.startsWith("http")
          ? serviceObj.image
          : `/${serviceObj.image}`, // Add leading slash for root-relative path
      };
    });

    console.log("Sending service example:", servicesWithUrls[0]); // Debug log
    res.json(servicesWithUrls);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({
      success: false,
      message: "Error loading healthcare services",
    });
  }
});

// Book an appointment
router.post("/appointment", async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    const savedAppointment = await appointment.save();
    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment: savedAppointment,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
