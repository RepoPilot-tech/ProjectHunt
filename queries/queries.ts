import "server-only"

import { genSaltSync, hashSync } from "bcrypt-ts";

import prisma from "@/lib/prisma"

export async function getUser(email: string){
    try{
        const res = await prisma.user.findFirst({
            where: {email}
        })
        console.log("user found", res);
        return res;
    } catch(error){
        console.log("error fetching user");
        throw error;
    }
}

export async function createUser(email: string, password: string){
    let salt = genSaltSync(10);
    let hash = hashSync(password, salt);
    // saveSpace({"All", "👑"});

    try{
        const res = await prisma.user.create({data: {email, password:hash}})
        console.log("user created", res);
        saveSpace({spaceName: "All",spaceIcon: "👑",userId: res.id});
        return res
    } catch(error){
        console.log("error creating User");
        throw error;
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
        console.log("while saving chat", error)
        throw error;
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
        console.log("failed to delete chat by id from db");
        throw error;
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
        console.log("Failed to get chats by user from db");
        throw error;
    }
}

export async function getChatById({id}: {id: string}){
    try {
        const selectedChat = await prisma.chat.findUnique({
            where: {
                id: id
            }
        })

        console.log("selected chat", selectedChat);
        return selectedChat;
    } catch (error) {
        console.log("Failed to get chat by id from database")
        throw error;
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
                return;
            }
            // selectedSpaces = [{id: "28881943-c6c0-4eb7-a4a3-5c446ed7c76a"}]
            // console.log("this one is by default ---------", selectedSpaces);
        }

        const spaceNames = selectedSpaces.map(space => space.id);
        console.log("from space name", spaceNames)
        try{
            const spaces = await prisma.spaces.findMany({
                where: {
                    name: {in: spaceNames.id},
                    userId: userId,
                }
            });
            
            if(spaces.length === 0){
                throw new Error("No Matching spaces found for the given user");
            }

            const project = await prisma.project.create({
                data: {
                    name: name,
                    creatorName: creatorName,
                    websiteLink: websiteLink,
                }
            });

            await prisma.projectSpace.createMany({
                data: spaces.map(space => ({
                    projectId: project.id,
                    spaceId: space.id
                }))
            });

            console.log("Project Successfully linked to spaces: ", project);
            return project;
        } catch(e){
            console.log("Error creating projectttt", e);
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
        console.log("error fetch project by websitelink")
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
        console.log("Delete Project");
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
        console.log("saving space error")
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
        console.log("spce data recived", res);
        return res;
    } catch (error) {
        console.log("error fetching all spaces", error);
    }
}