import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Candidate from "@/model/candidatemodel"
import Company from "@/model/companymodel"

export async function PATCH(req: Request) {
  try {

    await connectDB()

    const { id, type } = await req.json()

    if (!id || !type) {
      return NextResponse.json(
        { success: false, message: "Missing parameters" },
        { status: 400 }
      )
    }

    let updatedEntity

    if (type === "candidate") {

      const candidate = await Candidate.findById(id)

      if (!candidate) {
        return NextResponse.json(
          { success: false, message: "Candidate not found" },
          { status: 404 }
        )
      }

      candidate.isVerified = !candidate.isVerified
      updatedEntity = await candidate.save()

    }else if (type === "company") {

      const company = await Company.findById(id)

      if (!company) {
        return NextResponse.json(
          { success: false, message: "Company not found" },
          { status: 404 }
        )
      }

      company.isVerified = !company.isVerified
      updatedEntity = await company.save()

    }

    else {
      return NextResponse.json(
        { success: false, message: "Invalid type" },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      data: updatedEntity
    })

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    )
  }
}