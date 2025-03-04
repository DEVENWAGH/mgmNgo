import mongoose from "mongoose";

const healthServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: String,
  availability: {
    days: [String],
    time: String,
  },
  doctors: [
    {
      name: String,
      specialization: String,
      availability: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("HealthService", healthServiceSchema);
