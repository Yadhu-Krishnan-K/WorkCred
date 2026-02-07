import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    senderId: String,
    receiverId: String,
    message: String,
    roomId: String,
  },
  { timestamps: true }
);

export default mongoose.models.Message ||
  mongoose.model("Message", MessageSchema);
