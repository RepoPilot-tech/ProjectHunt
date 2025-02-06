import { auth } from "@/app/(auth)/auth";
import { getAllSpaces } from "@/queries/queries";

export async function GET(){
  // console.log("i am here inside get space")
  const session = await auth();
  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }
  const userId = session.user.id
  if(!userId){
    return;
  }
  
  try {
    const savedSpaces = await getAllSpaces({userId})
    return new Response(JSON.stringify(savedSpaces), {
      status: 201,
    });
  } catch (error) {
    // console.log("error fetching all the spaces", error);
    return new Response("An error occurred while processing your request", {
      status: 500,
    });
  }
}