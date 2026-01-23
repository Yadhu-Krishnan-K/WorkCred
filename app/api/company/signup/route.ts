import  companymodel from "@/model/companymodel";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function POST(req:Request){
    try {
        await connectDB();
        const {name,email,password,type}=await req.json();
        const companyData=await companymodel.findOne({email})
        if(companyData){
            return NextResponse.json({message:"company already exist"},{status:400})
        }
        const hashedpassword=await bcrypt.hash(password,10);
        const newuser=new companymodel({name,email,password:hashedpassword, companyType: type,})
        await newuser.save();
        return NextResponse.json({message:"company registered successfully"},{status:200})
    } catch {
  return NextResponse.json({ message: "server error" }, { status: 500 });
}
}
