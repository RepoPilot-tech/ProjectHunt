import React from "react"

import { NavUser } from "@/components/nav-user"
import { Spaces } from "@/components/Spaces"
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
import {DataProvider } from "@/provider/spaceContext"

import MainPopover from "./main-popover"
import { ProjectShowCase } from "./projectHunt/ProjectShowCase"


export function SidebarRight({
  user
}: {user: any}) {

  return (
    <Sidebar
      collapsible="none"
      className="h-svh border-l-2 overflow-y-scroll !w-[32rem] rounded-l-3xl"
    >
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser user={user} />
      </SidebarHeader>
      <SidebarContent className="">
        <ProjectShowCase />
        <div className="w-full flex justify-center items-center mt-4">
        <MainPopover />
        </div>
        <Spaces />
      </SidebarContent>
    </Sidebar>
  )
}
