import { generateObject } from "ai";
import { z } from "zod";

import { geminiFlashModel } from ".";

export async function generateRecommendations({ prompt }: any) {
  const { object: recommendations } = await generateObject({
    model: geminiFlashModel,
    prompt,
    schema: z.object({
      tools: z.array(
        z.object({
          name: z.string().describe("Tool/Project Name"),
          websiteLink: z.string().describe("Website Link"),
          creatorName: z.string().describe("Creator/Builder Name"),
          description: z.string().describe("Description of tool")
        })
      ).length(5),
    }),
  });

  return recommendations.tools;
}
