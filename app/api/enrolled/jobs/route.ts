import { NextRequest, NextResponse } from "next/server";
import companymodel from "@/model/companymodel";
import jobmodel from "@/model/jobmodel";
import {connectDB} from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";


export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }
    
    
    await connectDB();
    
    const [jobsData, companiesData] = await Promise.all([jobmodel.find().lean(), companymodel.find().lean()])
    
    return NextResponse.json(
        {success:true, jobs:jobsData, companies: companiesData},
        {status:200}
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Upload failed" },
      { status: 500 }
    );
  }
}