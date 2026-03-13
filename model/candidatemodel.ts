import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface CandidateDocument extends Document{
  fullName: string;
  email: string;
  password: string;
  isVerified: boolean;

  paymentStatus:string;
  successViewed:boolean;
  stream: string;
  description?: string;
  experience?: string;          // keep string since UI uses "5+ Years"
  skills: string[];
  qualification?: string;
  avgRating: number;
  
  pdfUrl?: string;
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

    paymentStatus: {
      type:String,
      default:"PENDING" 
    },

    successViewed: {
      type: Boolean,
      default: false,
    },

    stream: {      //for the work field / eg: IT/MEDICAL... CAN ONLY SELECT ONE STREAM AT A TIME
      type: String,
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
      default: 0,
      min: 0,
      max: 5,
    },

    pdfUrl:{
      type: String,
      default: null,
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
