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

    try{
        const res = await prisma.user.create({data: {email, password:hash}})

        console.log("user created", res);
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
    userId
}: {
    id: string;
    name: string;
    creatorName: string;
    websiteLink: string;
    selectedSpaces: string[];
    userId: string;
}){
    try {
        const spacesToSave = selectedSpaces.length > 0 ? selectedSpaces : ["All"];
        const res = await prisma.project.create({
            data: {
                id,
                name,
                creatorName,
                websiteLink,
                createdAt: new Date(),
                userId,
                space: {
                    // @ts-ignore
                    connect: spacesToSave.map((spaceId) => {
                        return { id: spaceId };
                    })
                },
            }
        })

        return res;
    } catch (error) {
        console.log("Failed to save project in DB", error);
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