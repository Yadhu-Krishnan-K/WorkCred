// models/Admin.ts
import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "superadmin" },
  lastLogin: { type: Date, default: Date.now },
}, { timestamps: true });

export const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);