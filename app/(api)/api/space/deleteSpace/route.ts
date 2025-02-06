import { NextResponse } from 'next/server';

import { auth } from "@/app/(auth)/auth";
import { deleteSpace } from "@/queries/queries";

export async function POST(request: Request) {
    console.log("i have reached here to delete you");

    try {
        const { spaceId } = await request.json();

        if (!spaceId) {
            return new Response("Missing required fields", { status: 400 });
        }

        const session = await auth();

        if (!session || !session.user) {
            return new Response("Unauthorized", { status: 401 });
        }

        console.log("I am here too, ready to delete");
        const userId = session.user.id;

        if (!userId) {
            return new Response("User ID not found", { status: 400 });
        }

        const res = await deleteSpace({ spaceId, userId });

        return new Response(JSON.stringify(res), {
            status: 200
        });
    } catch (e) {
        console.log("Error occurred while deleting the space:", e);
        return new Response("An error occurred while processing your request", {
            status: 500
        });
    }
}