import * as React from "react"
import { Plus } from "lucide-react"

import { Spaces } from "@/components/Spaces"
import { DatePicker } from "@/components/date-picker"
import { NavUser } from "@/components/nav-user"
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
import { ProjectShowCase } from "./projectopedia/ProjectShowCase"

// This is sample data.
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
      <SidebarContent>
        <ProjectShowCase />
        <SidebarGroupLabel>Spaces</SidebarGroupLabel>
        {/* <SidebarSeparator className="mx-0" /> */}
        <Spaces spaces={data.spaces} />
      </SidebarContent>


      {/* <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Plus />
              <span>New Calendar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter> */}
    </Sidebar>
  )
}
