import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
        if (!apiKey) {
            throw new Error("Missing API Key for Google Generative AI");
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-002" });

        const prompt = `
            You are a highly efficient and intelligent website crawler designed to assist users in finding the best tools and projects for their needs. Your primary task is to: fetch details of the 10 trending projects/tools. Provide detailed information about each tool or project in the following format: ToolName, WebsiteLink, CreatorName and description. Brief small description about the tool under 25 words Always present exactly 10 recommendations that are relevant to the user’s query, prioritizing quality and effectiveness. never give fake information to the user If needed, access the latest and most reliable resources on the internet to gather this information. give it in a array format so i can map through it easily dont add other texts rather than array
        `;

        const result = await model.generateContent(prompt);
        const output = await result.response.text(); // Correct way to extract content

        console.log("Generated Output:", output);
        return NextResponse.json({ output });

    } catch (error) {
        console.error("Error generating AI response:", error);
        return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
    }
}
