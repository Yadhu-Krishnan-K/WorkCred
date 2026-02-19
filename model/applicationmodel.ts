// import mongoose, { Schema, Document } from "mongoose";

// export interface ApplicationDocument extends Document {
//   jobId: mongoose.Types.ObjectId;
//   candidateId: mongoose.Types.ObjectId;
//   companyId: mongoose.Types.ObjectId;
//   status: "PENDING" | "ACCEPTED" | "REJECTED";
//   createdAt: Date;
//   updatedAt: Date;
// }

// const ApplicationSchema = new Schema<ApplicationDocument>(
//   {
//     jobId: {
//       type: Schema.Types.ObjectId,
//       ref: "Job",
//       required: true,
//     },
//     candidateId: {
//       type: Schema.Types.ObjectId,
//       ref: "Candidate",
//       required: true,
//     },
//     companyId: {
//       type: Schema.Types.ObjectId,
//       ref: "Company",
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["PENDING", "ACCEPTED", "REJECTED"],
//       default: "PENDING",
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Application ||
//   mongoose.model<ApplicationDocument>("Application", ApplicationSchema);
import mongoose, { Schema, Document } from "mongoose";

export interface ApplicationDocument extends Document {
  jobId: mongoose.Types.ObjectId;
  candidateId: mongoose.Types.ObjectId;
  companyId: mongoose.Types.ObjectId;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<ApplicationDocument>(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    candidateId: {
      type: Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },

    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

/* 🔥 ADD THIS (MOST IMPORTANT) */
ApplicationSchema.index(
  { jobId: 1, candidateId: 1 }, // combination
  { unique: true }
);

export default mongoose.models.Application ||
  mongoose.model<ApplicationDocument>("Application", ApplicationSchema);