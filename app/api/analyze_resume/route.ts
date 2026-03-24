// import { NextRequest, NextResponse } from "next/server";
// import { GoogleGenerativeAI, SchemaType, Schema } from "@google/generative-ai";

// import pdf from 'pdf-parse'

// export const runtime = "nodejs";

// const resumeSchema: Schema = {
//   description: "Structured professional profile data",
//   type: SchemaType.OBJECT,
//   properties: {
//     fullName: { type: SchemaType.STRING },
//     industry: { type: SchemaType.STRING },
//     headline: { type: SchemaType.STRING },
//     summary: { type: SchemaType.STRING },
//     experience: {type: SchemaType.STRING},
//     education:{type: SchemaType.STRING},
//     skills: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
//     missingFields: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
//   },
//   required: ["fullName", "industry", "missingFields"],
// };


// export async function POST(req: NextRequest) {
//   try {
//     // CHANGE: Instead of formData, we parse the JSON body
//     console.log('start-------------')
//     const formData = await req.formData()
//     const file = formData.get("resume") as File;
//     console.log('========================= 1st field')

//     if (!file) {
//       return NextResponse.json({ error: "No resume uploaded" }, { status: 400 });
//     }

//     console.log("file exist..................0.................")

//     // Convert file → buffer
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     console.log('buffer created!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')

//     const parsedData = await pdf(buffer)
//     console.log('parsing resume 1st pace))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))')

//     console.log('parsed resume##############################################################################################################3')
//     const resumeText = parsedData.text; // We expect { "text": "..." } from Postman

//     console.log('resumeText after parsing = ',resumeText)

//     if (!resumeText) {
//       return NextResponse.json({ error: "No resume text provided in 'text' field" }, { status: 400 });
//     }

//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
//     const model = genAI.getGenerativeModel({
//       model: "gemini-2.5-flash",
//       generationConfig: {
//         responseMimeType: "application/json",
//         responseSchema: resumeSchema,
//       },
//     });

//     // CHANGE: Since we have text, we don't need the 'inlineData' Base64 block.
//     // We just pass the text directly in the prompt.
//     const prompt = `
//       You are WorkCred AI. Analyze the following resume text for a professional profile:
//       ---
//       ${resumeText}
//       ---
//       1. Identify the industry.
//       2. Extract details into the JSON schema.
//       3. List missing contact info in missingFields.
//     `;

//     const result = await model.generateContent(prompt);
//     const responseText = result.response.text();
    
//     return NextResponse.json(JSON.parse(responseText));

//   } catch (error: any) {
//     console.error("AI Route Error:", error);
//     return NextResponse.json({ error: "Failed to analyze" }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, SchemaType, Schema } from "@google/generative-ai";
import * as pdf from "pdf-parse";

export const runtime = "nodejs";

const resumeSchema: Schema = {
  description: "Structured professional profile data",
  type: SchemaType.OBJECT,
  properties: {
    fullName: { type: SchemaType.STRING },
    industry: { type: SchemaType.STRING },
    headline: { type: SchemaType.STRING },
    summary: { type: SchemaType.STRING },
    experience: { type: SchemaType.STRING },
    education: { type: SchemaType.STRING },
    skills: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    missingFields: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
  },
  required: ["fullName", "industry", "missingFields"],
};

export async function POST(req: NextRequest) {
  try {
    console.log("start-------------");

    const formData = await req.formData();
    const file = formData.get("resume") as File;

    if (!file) {
      return NextResponse.json({ error: "No resume uploaded" }, { status: 400 });
    }

    console.log("file exists ✅");

    // Convert file → buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log("buffer created ✅");

    // 👇 IMPORTANT FIX (call pdf.default)
    const parsedData = await (pdf as any).default(buffer);

    const resumeText = parsedData.text;

    console.log("parsed text:", resumeText);

    if (!resumeText) {
      return NextResponse.json(
        { error: "Failed to extract text from PDF" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: resumeSchema,
      },
    });

    const prompt = `
      You are WorkCred AI. Analyze the following resume text for a professional profile:
      ---
      ${resumeText}
      ---
      1. Identify the industry.
      2. Extract details into the JSON schema.
      3. List missing contact info in missingFields.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return NextResponse.json(JSON.parse(responseText));

  } catch (error: any) {
    console.error("AI Route Error:", error);
    return NextResponse.json({ error: "Failed to analyze" }, { status: 500 });
  }
}