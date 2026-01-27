import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import candidatemodel from "@/model/candidatemodel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";


export async function GET(req:Request){
  try {
    
    console.log('reached route.....999999999999999999999999999999999999')
    const session = await getServerSession(authOptions)
    console.log('session = ',session)
    if(!session?.user){
        return NextResponse.json({message:"Unauthorized"},{status:401})
    }
    
    await connectDB();
    
    const candidate = await candidatemodel.findById(session.user.id).select('-password')

    if (!candidate) {
      return NextResponse.json(
        { message: "Candidate not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(candidate);
    
  } catch (error) {
    console.log('errror = ',error)
    return NextResponse.json({message:(error as any).message},{status:500})
  }
}
