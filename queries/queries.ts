import "server-only"

import { genSaltSync, hashSync } from "bcrypt-ts";

import prisma from "@/lib/prisma"

export async function getUser(email: string){
    try{
        const res = await prisma.user.findFirst({
            where: {email}
        })
        // console.log("user found", res);
        return res;
    } catch(error){
        // console.log("error fetching user");
        return new Response("error fetching user", {
            status: 500,
          });
    }
}

export async function createUser(email: string, password: string){
    let salt = genSaltSync(10);
    let hash = hashSync(password, salt);
    // saveSpace({"All", "👑"});

    try{
        const res = await prisma.user.create({data: {email, password:hash}})
        // console.log("user created", res);
        saveSpace({spaceName: "All",spaceIcon: "👑",userId: res.id});
        return res
    } catch(error){
        // console.log("error creating User");
        return new Response("error creating User", {
            status: 500,
          });
    }
}

export async function saveChat({
    id,
    messages,
    userId
}: {
    id: string,
    messages: any,
    userId: string
}){
    try {
        const existingChat = await prisma.chat.findUnique({
            where: {
                id: id
            }
        })

        if(existingChat){
            return await prisma.chat.update({
                where: {
                    id: id
                },
                data: {
                    messages: JSON.stringify(messages),
                }
            })
        }

        return await prisma.chat.create({
            data: {
                id,
                createdAt: new Date(),
                messages: JSON.stringify(messages),
                userId
            },
        });

    } catch (error) {
        // console.log("while saving chat", error)
        return new Response("while saving chat", {
            status: 500,
          });
    }
}

export async function deleteChatById({id}: {id: string}){
    try {
        const res = await prisma.chat.delete({
            where: {
                id: id,
            }
        })
    
        return res;
    } catch (error) {
        // console.log("failed to delete chat by id from db");
        return new Response("failed to delete chat by id from db", {
            status: 500,
          });
    }
}

export async function getChatsByUserId({id}: {id: string}){
    try {
        const res = await prisma.chat.findMany({
            where: {
                userId: id
            }
        })
        return res;
    } catch (error) {
        // console.log("Failed to get chats by user from db");
        return new Response("Failed to get chats by user from db", {
            status: 500,
          });
    }
}

export async function getChatById({id}: {id: string}){
    try {
        const selectedChat = await prisma.chat.findUnique({
            where: {
                id: id
            }
        })

        // console.log("selected chat", selectedChat);
        return selectedChat;
    } catch (error) {
        // console.log("Failed to get chat by id from database")
        return new Response("Failed to get chat by id from database", {
            status: 500,
          });;
    }
}

export async function saveProject({
    id,
    name,
    creatorName,
    websiteLink,
    selectedSpaces,
    userId
}: any) {
    if (selectedSpaces.length === 0) {
        console.log("length is zero i am not saving you tada");
        try {
            const defaultSpace = await prisma.spaces.findFirst({
                where: { name: "All", userId: userId }
            });

            if (!defaultSpace) {
                throw new Error('No default "[All]" space found for the user.');
            }

            selectedSpaces = [defaultSpace];
            console.log("Using the default '[All]' space", selectedSpaces);
        } catch (error) {
            console.log("Error fetching default space", error);
            return new Response("An error occurred while processing your request", {
                status: 500,
            });
        }
    }

    const spacesId = selectedSpaces.map((space: { id: any }) => space.id);
    console.log("from space name", spacesId);

    try {
        // Check if project already exists
        let project = await prisma.project.findUnique({
            where: { websiteLink }
        });

        if (!project) {
            // Create project if it doesn't exist
            project = await prisma.project.create({
                data: {
                    name,
                    creatorName,
                    websiteLink,
                }
            });
        }

        // Add the project to the user's selected spaces
        await prisma.projectSpace.createMany({
            data: spacesId.map((spaceId: any) => ({
                projectId: project.id,
                spaceId: spaceId,
            })),
            skipDuplicates: true,
        });

        console.log("Project saved successfully:", project);
        return { success: true, message: "Project saved successfully" };
    } catch (error) {
        console.error("Error saving project:", error);
        return { success: false, message: "Failed to save project" };
    }
}


export async function deleteProject({ websiteLink, userId }: { websiteLink: string; userId: string }) {
    try {
        // Find the project
        // console.log("delete step 1", websiteLink, userId);
        const project = await prisma.project.findUnique({
            where: { websiteLink: websiteLink },
            include: { spaces: true }, // Get all associated spaces
        });

        if (!project) {
            return { success: false, message: "Project not found" };
        }

        // Get user's spaces where this project is saved
        // console.log("delete step 2")
        const userSpaces = await prisma.spaces.findMany({
            where: { userId },
            select: { id: true },
        });

        const userSpaceIds = userSpaces.map((space) => space.id);

        // Delete the project-space relation for the user's spaces
        // console.log("delete step 3")
        await prisma.projectSpace.deleteMany({
            where: {
                projectId: project.id,
                spaceId: { in: userSpaceIds }, // Only remove from this user's spaces
            },
        });

        // Check if the project is still associated with any spaces
        // console.log("delete step 4")
        const remainingLinks = await prisma.projectSpace.count({
            where: { projectId: project.id },
        });

        // If no one else has saved the project, delete it from `Project`
        // console.log("delete step 5")
        if (remainingLinks === 0) {
            await prisma.project.delete({
                where: { id: project.id },
            });
            return { success: true, message: "Project deleted from database" };
        }

        return { success: true, message: "Project removed from your spaces" };
    } catch (error) {
        console.error("Error deleting project:", error);
        return { success: false, message: "Failed to delete project" };
    }
}


export async function getProjectByLink({websiteLink}: {websiteLink: string}){
    try {
        const res = await prisma.project.findUnique({
            where: {
                websiteLink: websiteLink
            }
        })

        return res;
    } catch (error) {
        // console.log("error fetch project by websitelink")
        throw error;
    }
}

export async function saveSpace({spaceName, spaceIcon, userId}: {spaceName: string, spaceIcon: string, userId: string}){
    try{
        const res = await prisma.spaces.create({
            data: {
                name: spaceName,
                icon: spaceIcon,
                createdAt: new Date(),
                userId
            }
        })
    } catch(error){
        // console.log("saving space error")
        throw error;
    }
}

export async function getAllSpaces({userId}:any){
    try {
        const res = await prisma.spaces.findMany({
            where: {
                userId: userId
            }
        })
        // console.log("spce data recived", res);
        return res;
    } catch (error) {
        // console.log("error fetching all spaces", error);
        return new Response("An error occurred while processing your request", {
            status: 500,
          });
    }
}

export async function getAllSpaceProjects({userId, id}){
    try {
      const res = await prisma.spaces.findUnique({
        where: {
            id: id,
            userId: userId, // Ensures the space belongs to the specific user
          },
          include: {
            projectSpaces: {
                include: {
                    project: true
                }
            }
          }
      })
    //   console.log("these are the spaces projects", res?.projectSpaces);
      return res?.projectSpaces;
    } catch (error) {
        return new Response("An error occurred while processing your request", {
            status: 500,
          });
        // console.log("error fetching saved Projects in space", error)
    }
}

export async function deleteSpace({ spaceId, userId }) {
    try {
        console.log("Attempting to delete space...");

        const res = await prisma.spaces.delete({
            where: {
                id: spaceId, // Ensure only the space with this ID is targeted
                userId: userId, // Ensure only the user's space is deleted
            },
        });

        console.log("Deleted space successfully:", res);
        return res;
    } catch (error) {
        console.error("Error deleting the space:", error);

        // Handle case where the space doesn't exist
        if (error.code === "P2025") {
            return { error: "Space not found or already deleted." };
        }

        return { error: "Error deleting the space. Please try again later." };
    }
}
