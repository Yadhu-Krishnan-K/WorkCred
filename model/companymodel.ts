import mongoose, { Schema, Document } from "mongoose";

export interface CompanyDocument extends Document {
  companyName: string;
  email: string;
  password:string;
  companyType: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
   description:string;
   city:string;

  profileImageUrl?: string;
  profileImagePublicId?: string;
  
}

const CompanySchema = new Schema<CompanyDocument>(
  {
    companyName: {
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
 description: {
      type: String,
      default: "",
      maxlength: 1000,
    },
profileImageUrl: {
      type: String,
      default: null,
    },

    profileImagePublicId: {
      type: String,
      default: null,
    },
     city: {
  type: String,
  required: true,
},


    companyType: {
      type: String,
      enum: [
        "IT",
        "MEDICAL",
        "AUTOMOBILE",
        "AGRICULTURE",
        "HAND_CRAFTS",
        "OTHERS",
      ],
      required: true,
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

export default mongoose.models.Company ||
  mongoose.model<CompanyDocument>("Company", CompanySchema);
