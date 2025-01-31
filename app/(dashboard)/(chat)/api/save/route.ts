// app/api/save/route.ts

import { NextResponse } from 'next/server';

import { auth } from '@/app/(auth)/auth';
import { saveProject } from '@/queries/queries';


export async function POST(req: Request) {
    try {
      const { name, creatorName, websiteLink, description, selectedSpaces } = await req.json();
      const session = await auth();
      if (!session) {
        return new Response("Unauthorized", { status: 401 });
      }
      
      console.log("setting selected spaces", selectedSpaces);
      if(selectedSpaces.length === 0){
        console.log("no spaces selected")
      }
      // Call the saveProject function to save the project
      console.log("hum yha phatenge", name, selectedSpaces, session?.user?.id);
      try {
        const project = await saveProject({
          id: crypto.randomUUID(),
          name,
          creatorName,
          websiteLink,
          selectedSpaces,
          userId: session?.user?.id, 
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

  