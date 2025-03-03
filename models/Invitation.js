import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema({
  templateId: {
    type: String,
    required: true,
  },
  textFields: {
    name: String,
    date: String,
    venue: String,
  },
  updatedImageData: {
    type: String,
    required: false, // Change to false if you don't want it to be required
    default: "", // Provide a default value
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Invitation", invitationSchema);
