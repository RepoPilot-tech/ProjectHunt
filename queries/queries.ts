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
    userId}: any){
        if(selectedSpaces.length === 0){
            console.log("length is zero i am not saving you tada");
            try {
                const defaultSpace = await prisma.spaces.findFirst({
                    where: {
                        name: "All",
                        userId: userId,
                    }
                })
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
            // selectedSpaces = [{id: "28881943-c6c0-4eb7-a4a3-5c446ed7c76a"}]
            // console.log("this one is by default ---------", selectedSpaces);
        }

        const spacesid = selectedSpaces.map((space: { id: any; }) => space.id);
        console.log("from space name", spacesid)
        try {
            const newProject = await prisma.project.create({
                data: {
                    name: name,
                    creatorName: creatorName,
                    websiteLink: websiteLink,
                    spaces: {
                        create: spacesid.map((spacesid: any) => ({
                            space: {
                                connect: {
                                    id: spacesid
                                }
                            }
                        }))
                    }
                }
            })

            console.log("New project created:", newProject);
            return newProject;
        } catch (error) {
            console.error("Error creating project:", error);
            throw error;
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

export async function deleteProject({websiteLink}: {websiteLink: string}){
    try {
        const res = await prisma.project.delete({
            where: {
                websiteLink: websiteLink
            }
        })

        return res;
    } catch (error) {
        // console.log("Delete Project");
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
        console.log("now I am gonna try");

        const res = await prisma.spaces.delete({
            where: {
                userId: userId,
                id: spaceId
            }
        });

        console.log("deleted space successfully");
        return res;
    } catch (error) {
        console.log("Error deleting the space:", error);
        return { error: "Error deleting the space. Please try again later." };
    }
}