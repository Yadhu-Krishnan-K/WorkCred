import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    requestId: String,

    senderId: String,
    receiverId: String,

    communication: Number,
    performance: Number,
    skills: Number,

    approach: Number,
    environment: Number,
    visibility: Number,

    overallRating: Number,
    review: String
  },
  { timestamps: true }
);

export const Rating =
  mongoose.models.Rating ||
  mongoose.model("Rating", ratingSchema);