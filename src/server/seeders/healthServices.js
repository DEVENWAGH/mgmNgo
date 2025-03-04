import mongoose from "mongoose";
import HealthService from "../models/HealthService.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../..", ".env") });

const healthServices = [
  {
    name: "General Health Checkup",
    description: "Comprehensive health screening and preventive care services",
    image: "health.jpg", // Using existing image from the project
    availability: {
      days: ["Monday", "Wednesday", "Friday"],
      time: "9:00 AM - 5:00 PM",
    },
    doctors: [
      {
        name: "Dr. Rajesh Kumar",
        specialization: "General Medicine",
        availability: "Monday, Wednesday",
      },
      {
        name: "Dr. Priya Singh",
        specialization: "Family Medicine",
        availability: "Friday",
      },
    ],
  },
  {
    name: "Dental Care",
    description:
      "Complete dental care including cleanings, fillings, and dental surgeries",
    image: "health1.jpg", // Using existing image from the project
    availability: {
      days: ["Tuesday", "Thursday", "Saturday"],
      time: "10:00 AM - 6:00 PM",
    },
    doctors: [
      {
        name: "Dr. Amit Patel",
        specialization: "Dentist",
        availability: "Tuesday, Thursday",
      },
    ],
  },
  {
    name: "Eye Care",
    description:
      "Vision testing, eye examinations, and treatment of eye conditions",
    image: "health2.jpg", // Using existing image from the project
    availability: {
      days: ["Monday", "Thursday", "Saturday"],
      time: "9:00 AM - 4:00 PM",
    },
    doctors: [
      {
        name: "Dr. Sarah Khan",
        specialization: "Ophthalmologist",
        availability: "Monday, Thursday",
      },
    ],
  },
  {
    name: "Women's Health",
    description:
      "Specialized healthcare services for women including prenatal care",
    image: "health3.jpg", // Using existing image from the project
    availability: {
      days: ["Tuesday", "Wednesday", "Friday"],
      time: "9:00 AM - 5:00 PM",
    },
    doctors: [
      {
        name: "Dr. Meena Sharma",
        specialization: "Gynecologist",
        availability: "Tuesday, Friday",
      },
    ],
  },
  {
    name: "Pediatric Care",
    description: "Complete healthcare services for children and adolescents",
    image: "health4.jpg", // Using existing image from the project
    availability: {
      days: ["Monday", "Wednesday", "Friday"],
      time: "10:00 AM - 4:00 PM",
    },
    doctors: [
      {
        name: "Dr. Rahul Verma",
        specialization: "Pediatrician",
        availability: "Monday, Wednesday, Friday",
      },
    ],
  },
  {
    name: "Mental Health Services",
    description: "Counseling and mental health support services",
    image: "health5.jpg", // Using existing image from the project
    availability: {
      days: ["Tuesday", "Thursday", "Saturday"],
      time: "11:00 AM - 7:00 PM",
    },
    doctors: [
      {
        name: "Dr. Anjali Das",
        specialization: "Psychiatrist",
        availability: "Tuesday, Thursday",
      },
    ],
  },
];

async function seedHealthServices() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    console.log("Connection string:", process.env.MONGODB_URI);

    // Clear existing services
    const deleteResult = await HealthService.deleteMany({});
    console.log("Cleared existing health services:", deleteResult);

    // Insert new services
    const insertResult = await HealthService.insertMany(healthServices);
    console.log("Added new health services:", insertResult.length, "services");
    console.log("First service example:", insertResult[0]);

    console.log("Seeding completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
}

seedHealthServices();
