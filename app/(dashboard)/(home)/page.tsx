import React from 'react'

import { Chat } from "@/components/custom/chat";
import { generateUUID } from "@/lib/utils";

const page = async () => {
     const id = generateUUID();
  return (
    <Chat key={id} id={id} initialMessages={[]} />
  )
}

export default page