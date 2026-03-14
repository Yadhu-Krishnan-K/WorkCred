import { connectDB } from "@/lib/db";
import companymodel from "@/model/companymodel";
import { NextResponse } from "next/server";



export async function GET(req: Request) {
    try {   
        await connectDB()
        const companies = await companymodel.find().select("-password").lean()
        if(!companies){
            return NextResponse.json({error: "No companies found"})
        }
        return NextResponse.json({companies},{status:200});
    } catch (error) {
        console.error("Error getting company details:",error);
        return NextResponse.json(
            {message: "Error getting company details"},
            {status: 500}
        )
    }
}