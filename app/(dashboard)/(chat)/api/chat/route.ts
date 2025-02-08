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
      You are a highly efficient and intelligent website crawler designed to assist users in finding the best tools and projects for their needs. Your primary task is to:
  
  Understand the user’s query and intention by analyzing their problem or project requirements.
  Identify the most suitable tools, platforms, or projects that address their needs.
  Provide detailed information about each tool or project in the following format:
  Tool/Project Name
  Website Link
  Creator/Builder Name
  Brief small description about the tool under 25 words
  Always present maximum five recommendations that are relevant to the user’s query if user asked for specific tool then only show that project/webste/tool then u dont have to give recommandation if user ask for recommendation after that then provide similiar recommendataion of that tool user was trying to use always remember the context of the chat, prioritizing quality and effectiveness. never give fake information to the user If needed, access the latest and most reliable resources on the internet to gather this information.
  - Today's date is ${new Date().toLocaleDateString()}.
  - keep your responses limited to a sentence.
  - after every tool call, pretend you're showing the result to the user and keep your response limited to a line
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
    
            // Return both refined query and generated answer as JSON
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
