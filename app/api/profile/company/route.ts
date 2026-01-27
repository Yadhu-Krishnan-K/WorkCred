import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import companymodel from "@/model/companymodel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";


export async function GET(req:Request){
    console.log("route reached")
    const session = await getServerSession(authOptions)
    if(!session?.user){
        return NextResponse.json({message:"Unauthorized"},{status:401})
    }
    
    await connectDB();
    
    const company = await companymodel.findOne({email:session.user.email}).select('-password')
    console.log("company:",company)

    if (!company) {
      return NextResponse.json(
        { message: "Candidate not found" },
        { status: 404 }
      );
    }

        return NextResponse.json(company);

}




export async function PUT(req: Request) {
  console.log("route reached",1233333333);
  try {
    console.log("reached reached")
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    await connectDB();

    const updatedCompany = await companymodel
      .findOneAndUpdate(
        { email: session.user.email },
        {
          companyName: body.companyName,
          companyType: body.companyType,
          description: body.description,
          city:body.city,
          website: body.website,
        },
        { new: true, runValidators: true }
      )
      .select("-password");
      console.log(updatedCompany )

    if (!updatedCompany) {
      return NextResponse.json(
        { message: "Company not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedCompany);
  } catch (error) {
    console.error("Update company error:", error);
    return NextResponse.json(
      { message: "Failed to update profile" },
      { status: 500 }
    );
  }
}
