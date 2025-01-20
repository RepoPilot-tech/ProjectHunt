import "server-only";

import { genSaltSync, hashSync } from "bcrypt-ts";
import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { user, chat, User, reservation, project } from "./schema";

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle
let client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`);
let db = drizzle(client);

export async function getUser(email: string): Promise<Array<User>> {
  try {
    return await db.select().from(user).where(eq(user.email, email));
  } catch (error) {
    console.error("Failed to get user from database");
    throw error;
  }
}

export async function createUser(email: string, password: string) {
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  try {
    return await db.insert(user).values({ email, password: hash });
  } catch (error) {
    console.error("Failed to create user in database");
    throw error;
  }
}

export async function saveChat({
  id,
  messages,
  userId,
}: {
  id: string;
  messages: any;
  userId: string;
}) {
  try {
    const selectedChats = await db.select().from(chat).where(eq(chat.id, id));

    if (selectedChats.length > 0) {
      return await db
        .update(chat)
        .set({
          messages: JSON.stringify(messages),
        })
        .where(eq(chat.id, id));
    }

    return await db.insert(chat).values({
      id,
      createdAt: new Date(),
      messages: JSON.stringify(messages),
      userId,
    });
  } catch (error) {
    console.error("Failed to save chat in database");
    throw error;
  }
}

export async function deleteChatById({ id }: { id: string }) {
  try {
    return await db.delete(chat).where(eq(chat.id, id));
  } catch (error) {
    console.error("Failed to delete chat by id from database");
    throw error;
  }
}

export async function getChatsByUserId({ id }: { id: string }) {
  try {
    return await db
      .select()
      .from(chat)
      .where(eq(chat.userId, id))
      .orderBy(desc(chat.createdAt));
  } catch (error) {
    console.error("Failed to get chats by user from database");
    throw error;
  }
}

export async function getChatById({ id }: { id: string }) {
  try {
    const [selectedChat] = await db.select().from(chat).where(eq(chat.id, id));
    return selectedChat;
  } catch (error) {
    console.error("Failed to get chat by id from database");
    throw error;
  }
}

export async function saveProject({
  id,
  name,
  creatorName,
  websiteLink,
  description,
  userId,
}: {
  id: string;
  name: string;
  creatorName: string;
  websiteLink: string;
  description: string;
  userId: string;
}) {
  try {
    const selectedprojects = await db
      .select()
      .from(project)
      .where(eq(project.id, id));

    if (selectedprojects.length > 0) {
      return await db
        .update(project)
        .set({
          name,
          creatorName,
          websiteLink,
          description,
        })
        .where(eq(project.id, id));
    }

    return await db.insert(project).values({
      id,
      name,
      creatorName,
      websiteLink,
      description,
      createdAt: new Date(), 
      userId,
    });
  } catch (error) {
    console.error("Failed to save project in database", error);
    throw error; 
  }
}

export async function getProjectByLink({ websiteLink }: { websiteLink: string }) {
  try {
    const [selectedProject] = await db.select().from(project).where(eq(project.websiteLink, websiteLink));
    return selectedProject;
  } catch (error) {
    console.error("Failed to get project by website link from database");
    throw error;
  }
}

export async function deleteProject({ websiteLink }: { websiteLink: string }) {
  try {
    return await db.delete(project).where(eq(project.websiteLink, websiteLink));
  } catch (error) {
    console.error("Failed to delete project by website link from database");
    throw error;
  }
}

// export async function saveProject({
//   id,
//   name,
//   creatorName,
//   websiteLink,
//   description,
//   userId,
// }: {
//   id: string;
//   name: string;
//   creatorName: string;
//   websiteLink: string;
//   description: string;
//   userId: string;
// }) {
//   try {
//     const selectedprojects = await db
//       .select()
//       .from(project)
//       .where(eq(project.id, id));

//     if (selectedprojects.length > 0) {
//       return await db
//         .update(project)
//         .set({
//           name,
//           creatorName,
//           websiteLink,
//           description,
//         })
//         .where(eq(project.id, id));
//     }

//     return await db.insert(project).values({
//       id,
//       name,
//       creatorName,
//       websiteLink,
//       description,
//       createdAt: new Date(), 
//       userId,
//     });
//   } catch (error) {
//     console.error("Failed to save project in database", error);
//     throw error; 
//   }
// }


// correct save space function its not working correctly
export async function saveSpace(spaceData) {
  console.log("from inside save space", spaceData);
  try {
    // Destructure directly from spaceData
    const spaceData = await db
      .select()
      .from(project)
      .where(eq(project.id, id));

    if (selectedprojects.length > 0) {
      return await db
        .update(project)
        .set({
          name,
          creatorName,
          websiteLink,
          description,
        })
        .where(eq(project.id, id));
    }

    return await db.insert(project).values({
      id,
      name,
      creatorName,
      websiteLink,
      description,
      createdAt: new Date(), 
      userId,
    });
  } catch (error) {
    console.error("Failed to save space:", error);
    throw new Error("Failed to save space");
  }
}


