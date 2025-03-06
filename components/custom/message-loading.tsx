/* eslint-disable tailwindcss/enforces-shorthand */
import { WandSparkles } from "lucide-react";

import { Skeleton } from "../ui/skeleton";

const MessageLoading = () => {
    return (
        <div className="flex relative w-fit gap-3 group">
        
        {/* Blurred Background Containers */}
        <div className="relative h-52 w-[18vw] blur group-hover:blur-0 duration-150">
          <Skeleton className="w-full h-full rounded-xl" />
        </div>
        
        <div className="relative h-52 w-[18vw] blur group-hover:blur-0 duration-150">
          <Skeleton className="w-full h-full rounded-xl" />
        </div>
      </div>
      
    )
}

export default MessageLoading;