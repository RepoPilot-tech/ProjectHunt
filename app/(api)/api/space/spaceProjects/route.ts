import { auth } from "@/app/(auth)/auth";
import { getAllSpaceProjects } from "@/queries/queries";

export async function GET(request: Request) {
  try {
    // console.log("yha phat bosdk");

    // Authenticate user
    const session = await auth();
    if (!session || !session.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userId = session.user.id;
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    // console.log("User ID && Query ID:", userId, id);
2

    if (!userId) {
      return new Response("User ID not found", { status: 400 });
    }

    const res = await getAllSpaceProjects({userId, id});
    // console.log("wassup bitch", res);

    return new Response(JSON.stringify(res), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    // console.error("Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
