import { NextResponse } from "next/server";

import { auth } from "@/app/(auth)/auth";
import { deleteProject, getProjectByLink } from "@/queries/queries";


export async function DELETE(req: Request) {
        const { websiteLink } = await req.json();  // Extract websiteLink from the request
        if (!websiteLink) {
            return new Response("Website link is required", { status: 400 });
        }
        const session = await auth();

  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const project = await getProjectByLink({ websiteLink });

    if (!project) {
      return new Response("Project not found", { status: 404 });
    }

    if (project.userId !== session.user.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    // console.log("reached here", websiteLink);
    await deleteProject({ websiteLink });

    return new Response("Project deleted", { status: 200 });
  } catch (error) {
    console.error("Error occurred while deleting project:", error);
    return new Response("An error occurred while processing your request", {
      status: 500,
    });
  }
}
