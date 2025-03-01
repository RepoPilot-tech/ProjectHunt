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
      Step 1: Parse and Optimize the Query
Identify key terms and the core request (e.g., tools, resources, websites).
Remove ambiguity and refine wording for accuracy and relevance.
Step 2: Determine if an API Call is Needed
If the user requests recommendations or tools, proceed to Step 3.
If the query is informational (advice, explanations), respond directly.
Step 3: Apply Strict Criteria for Tool Selection
Verification: Only include real, trusted tools; reject unverifiable sources.
Minimum Count: Ensure at least five verified tools (if applicable).
URL Validation: Confirm tools have legitimate, functional websites.
Diversity: Provide tools from varied categories when relevant.
Step 4: Fetch and Filter API Results
Send the refined query to the API.
Validate results before displaying: Check legitimacy, relevance, and usability.
If criteria are met, proceed to Step 6; otherwise, move to Step 5.
Step 5: Handle Missing or Invalid Results
If no valid tools are found, respond with:
“I couldn’t find verified tools. Would you like to refine your search?”
Optionally, assist the user in improving their query.
Step 6: Deliver the Final Response
Present tools in a clear, user-friendly format (name + verified URL).
Keep responses concise, informative, and structured.
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
