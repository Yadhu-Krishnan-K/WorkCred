import mongoose, { Schema, Document, Types } from "mongoose";

/* =====================
   TYPES
===================== */

export type RequestStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "CANCELLED";

export type RequestType =
  | "JOB"
  | "FREELANCE"
  | "INTERNSHIP";

export type UserRole = "Candidate" | "Company";

/* =====================
   INTERFACE
===================== */

export interface RequestDocument extends Document {

  sender: {
    role: UserRole;
    id: Types.ObjectId;
  };

  receiver: {
    role: UserRole;
    id: Types.ObjectId;
  };

  connectModel: RequestType;   // JOB / FREELANCE / INTERNSHIP

  connect_Id: Types.ObjectId;  // Job / Freelance / Internship ID

  message?: string;

  status: RequestStatus;

  createdAt: Date;
  updatedAt: Date;
}

/* =====================
   SCHEMA
===================== */

const RequestSchema = new Schema<RequestDocument>(
  {
    /* Sender (Candidate / Company) */
    sender: {
      role: {
        type: String,
        enum: ["Candidate", "Company"],
        required: true,
      },

      id: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: "sender.role",
      },
    },

    /* Receiver (Company / Candidate) */
    receiver: {
      role: {
        type: String,
        enum: ["Candidate", "Company"],
        required: true,
      },

      id: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: "receiver.role",
      },
    },

    /* Request Type */
    connectModel: {
      type: String,
      enum: ["JOB", "FREELANCE", "INTERNSHIP"],
      required: true,
    },

    /* Connected Entity ID */
    connect_Id: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "connectModel",
    },

    /* Optional Message */
    message: {
      type: String,
      maxlength: 1000,
    },

    /* Request Status */
    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "REJECTED", "CANCELLED"],
      default: "PENDING",
    },
  },

  {
    timestamps: true,
  }
);

/* =====================
   🔥 UNIQUE INDEX (MOST IMPORTANT)
   Prevent duplicate apply
===================== */

RequestSchema.index(
  {
    "sender.id": 1,     // Candidate ID
    connect_Id: 1,      // Job / Post ID
    connectModel: 1,    // JOB / FREELANCE / INTERNSHIP
  },
  {
    unique: true,
  }
);

/* =====================
   MODEL EXPORT
===================== */

export default mongoose.models.Request ||
  mongoose.model<RequestDocument>("Request", RequestSchema);