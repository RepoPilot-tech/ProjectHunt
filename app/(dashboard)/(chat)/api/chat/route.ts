import { convertToCoreMessages, Message, streamText } from "ai";
import { z } from "zod";

import { geminiProModel } from "@/ai";
import {
  generateRecommendations
} from "@/ai/actions";
import { auth } from "@/app/(auth)/auth";
// import { generateUUID } from "@/lib/utils";
import { deleteChatById, getChatById, saveChat } from "@/queries/queries";

export async function POST(request: Request) {
  const { id, messages }: { id: string; messages: Array<Message> } =
    await request.json();

  const session = await auth();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const coreMessages = convertToCoreMessages(messages).filter(
      (message) => message.content.length > 0,
    );
  
    const result = await streamText({
      model: geminiProModel,
      system: `
      Step 1: Understand the User’s Query
Goal: Refine the user query for better results.
Parse the query for key terms.
Identify the core request or topic (e.g., tools, resources, websites).
Refine the query if necessary for more accurate or relevant responses.
Step 2: Determine if a Tool Needs to Be Called
Goal: Decide whether an API call to fetch tools is needed.
If the user is asking for recommendations or specific tools, then proceed to Step 3.
If the user’s query is about general information (e.g., asking for advice or explanations), respond directly without calling any tool.
Step 3: Add Strict Instructions for Tool Generation
Goal: Ensure that tools are valid and meet the criteria before they are presented.
Don’t invent or guess: Reject tools that aren’t verified or come from untrustworthy sources.
At least 5 tools: Ensure the response includes a minimum of 5 real, verified tools (if applicable).
Check the URL: Ensure the tool has a legitimate, verifiable website (use URL validation).
Clarify the Result: If no tools are found or the result is invalid, respond with:
“I couldn’t find verified tools. Want me to try a different search?”
Ensure Variety: Provide tools from diverse categories when applicable, to cater to the user’s needs.
Step 4: Call the Tool API
Goal: Call the appropriate tool API to fetch data.
Send the refined query to the API.
Filter results before displaying them: Ensure they meet the validity criteria (check for valid URLs and profiles).
If the results meet the criteria, display them. Otherwise, proceed to Step 5.
Step 5: Handle Invalid or No Results
Goal: If the API returns no valid results, handle it gracefully.
Provide a fallback message: “I couldn’t find verified tools. Want me to try a different search?”
Optionally, ask the user if they want to refine their query.
Step 6: Return the Results
Goal: Provide the user with the response.
Present the tools in a user-friendly format.
Mention the tool names and valid URLs, and ensure the response is concise and clear.
`,
      messages: coreMessages,
      tools: {
        combinedQueryTool: {
          description: "Refines the user's query and generates tool recommendations.",
          parameters: z.object({
            userQuery: z.string().describe("The original user query."),
          }),
          execute: async ({ userQuery }) => {
            // Step 1: Refine the query
            const refinedQuery = `${userQuery}`;
    
            // Step 2: Generate an answer based on the refined query
            const answer = await generateRecommendations({ prompt: refinedQuery });
    
            return {
              // refinedQuery,
              answer,
            };
          },
        },
      },
      onFinish: async ({ responseMessages }) => {
        if (session.user && session.user.id) {
          try {
            await saveChat({
              id,
              messages: [...coreMessages, ...responseMessages],
              userId: session.user.id,
            });
          } catch (error) {
            console.error("Failed to save chat");
          }
        }
      },
      experimental_telemetry: {
        isEnabled: true,
        functionId: "stream-text",
      },
    });
  
    return result.toDataStreamResponse({});
  } catch (error) {
    console.log("error generating text");
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Not Found", { status: 404 });
  }

  const session = await auth();

  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const chat = await getChatById({ id });

    if (chat?.userId !== session.user.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    await deleteChatById({ id });

    return new Response("Chat deleted", { status: 200 });
  } catch (error) {
    return new Response("An error occurred while processing your request", {
      status: 500,
    });
  }
}
