import mongoose, { Schema, Document } from "mongoose";

export interface CandidateDocument extends Document {
  fullName: string;
  email: string;
  role: string;
  skills: string[];
  experience: number;
  rating: number;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CandidateSchema = new Schema<CandidateDocument>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    experience: {
      type: Number, // in years
      default: 0,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Candidate ||
  mongoose.model<CandidateDocument>("Candidate", CandidateSchema);

  