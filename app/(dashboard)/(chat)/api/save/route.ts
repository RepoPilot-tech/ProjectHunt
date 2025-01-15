// app/api/save/route.ts

import { auth } from '@/app/(auth)/auth';
import { saveProject } from '@/db/queries';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
      const { name, creatorName, websiteLink, description } = await req.json();
      const session = await auth();
      if (!session) {
        return new Response("Unauthorized", { status: 401 });
      }
  
      // Call the saveProject function to save the project
      try {
        const project = await saveProject({
          id: crypto.randomUUID(), // Generating a random UUID for the project ID
          name,
          creatorName,
          websiteLink,
          description,
          userId: session.user.id, // Assuming the session contains user details
        });
      } catch (error) {
        console.log('Error saving project:', error);
        return NextResponse.json({ message: 'Failed to save project' }, { status: 500 });
      }
  
      return NextResponse.json({ message: 'Data saved successfully' }, { status: 200 });
    } catch (error) {
      console.error('Error processing request:', error);
      return NextResponse.json({ message: 'Failed to process request' }, { status: 500 });
    }
  }

  