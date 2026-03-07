import mongoose from "mongoose";

const ratingRequestSchema = new mongoose.Schema(
  {
    senderId: String,
    receiverId: String,
    roomId: String,

    status: {
      type: String,
      default: "pending",
    },

    type: {
      type: String,
      enum: ["userToCompany", "companyToUser"],
      required: true,
    },
  },
  { timestamps: true }
);

export const RatingRequest =
  mongoose.models.RatingRequest ||
  mongoose.model("RatingRequest", ratingRequestSchema);