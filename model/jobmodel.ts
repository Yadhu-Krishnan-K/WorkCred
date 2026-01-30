import mongoose, { Schema, Document } from "mongoose";

export interface JobDocument extends Document {
  companyId: mongoose.Types.ObjectId;
  role: string;
  requirements: string;
  experience: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new Schema<JobDocument>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    requirements: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Job ||
  mongoose.model<JobDocument>("Job", JobSchema);
