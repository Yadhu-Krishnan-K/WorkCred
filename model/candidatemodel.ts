import mongoose, { Schema, Document } from "mongoose";

export interface CandidateDocument extends Document {
  fullName: string;
  email: string;
  password: string;
  isVerified: boolean;

  description?: string;
  experience?: string;          // keep string since UI uses "5+ Years"
  skills: string[];
  qualification?: string;
  avgRating: number;

  profileImageUrl?: string;
  profileImagePublicId?: string;

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

    password: {
      type: String,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    description: {
      type: String,
      default: "",
    },

    experience: {
      type: String,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },

    qualification: {
      type: String,
      default: "",
    },

    avgRating: {
      type: Number,
      default: 5,
      min: 0,
      max: 5,
    },

    profileImageUrl: {
      type: String,
      default: null,
    },

    profileImagePublicId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Candidate ||
  mongoose.model<CandidateDocument>("Candidate", CandidateSchema);
