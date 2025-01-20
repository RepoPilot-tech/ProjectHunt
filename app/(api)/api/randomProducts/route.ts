import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req, res) {

    try {
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "")

        const model = genAI.getGenerativeModel({ model: "gemini-pro" })

        const prompt = "You are a highly efficient and intelligent website crawler designed to assist users in finding the best tools and projects for their needs. Your primary task is to: fetch details of the 10 trending projects/tools. Provide detailed information about each tool or project in the following format: ToolName, WebsiteLink, CreatorName and description. Brief small description about the tool under 25 words Always present exactly 10 recommendations that are relevant to the user’s query, prioritizing quality and effectiveness. never give fake information to the user If needed, access the latest and most reliable resources on the internet to gather this information. give it in a array format so i can map through it easily"

        const result = await model.generateContent(prompt)
        const response = result.response;
        const output = response.text();
        console.log("out genai", output);
        return NextResponse.json({ output: output })
    } catch (error) {
        console.error(error)
    }
}