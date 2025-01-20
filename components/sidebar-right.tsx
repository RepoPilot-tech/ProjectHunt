
import { Plus, PlusIcon } from "lucide-react"

import { NavUser } from "@/components/nav-user"
import { Spaces } from "@/components/Spaces"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { User } from "@/db/schema"
import { DataProvider } from "@/provider/spaceContext"

import MainPopover from "./main-popover"
import { ProjectShowCase } from "./projectHunt/ProjectShowCase"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  spaces: [
    {
      name: "Web 3",
      items: ["Personal", "Work", "Family"],
    },
    {
      name: "Web Dev",
      items: ["Holidays", "Birthdays"],
    },
    {
      name: "Job",
      items: ["Travel", "Reminders", "Deadlines"],
    },
  ],
}

export function SidebarRight({
  user
}: {user: User | undefined}) {
  return (
    <Sidebar
      collapsible="none"
      className="sticky hidden lg:flex top-0 h-svh border-l overflow-y-scroll !w-[21rem]"
    >
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser user={user} />
      </SidebarHeader>
      {/* hi there */}
      <SidebarContent className="">
        <ProjectShowCase />
        {/* <div className="w-full flex justify-center items-center mt-4">
      <Popover>
        <PopoverTrigger className="flex text-white justify-between items-center gap-6 px-6 hover:gap-12 duration-200 ease-in-out bg-gray-600 hover:bg-gray-800 w-fit p-2 rounded-full">
        <h1>Spaces</h1>
        <PlusIcon />
        </PopoverTrigger>
        <PopoverContent>hi there</PopoverContent>
      </Popover>
        </div> */}
        <DataProvider>
        <div className="w-full flex justify-center items-center mt-4">
        <MainPopover />
        </div>
        <Spaces spaces={data.spaces} />
        </DataProvider>
      </SidebarContent>
    </Sidebar>
  )
}
