import mongoose, { Schema, Document, Types } from "mongoose";

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

export interface RequestDocument extends Document {  
  sender: {
    role: UserRole;
    id: Types.ObjectId;
  };

  receiver: {
    role: UserRole;
    id: Types.ObjectId;
  };

  connectModel: RequestType;
  connect_Id: Types.ObjectId;//job/freelance/connect id
  message?: string;
  status: RequestStatus;

  createdAt: Date;
  updatedAt: Date;
}

const RequestSchema = new Schema<RequestDocument>(
  {
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

    connectModel: {
      type: String,
      enum: ["JOB", "FREELANCE", "INTERNSHIP"],
      required: true,
    },

    connect_Id: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath:"connectModel"
    },

    message: {
      type: String,
      maxlength: 1000,
    },

    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "REJECTED", "CANCELLED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);


export default mongoose.models.Request ||
  mongoose.model<RequestDocument>("Request", RequestSchema);
