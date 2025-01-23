import {
  AudioWaveform,
  Blocks,
  Calendar,
  Command,
  Home,
  Inbox,
  MessageCircleQuestion,
  Search,
  Settings2,
  Sparkles,
  Trash2,
} from "lucide-react"
import { User } from "next-auth"
import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavWorkspaces } from "@/components/nav-workspaces"
import { NavHistory } from "@/components/navhistory"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import { NavUser } from "./nav-user"
import { Input } from "./ui/input"

export function SidebarLeft({
  user
}: {user: User | undefined} ) {
  return (
    <Sidebar className="border-r-0 !w-[21rem]">
      <SidebarHeader>
        <h1 className="truncate font-semibold text-2xl pl-2">ProjectoPedia</h1>
        <div className="relative w-full max-w-sm">
      <Input
        type="search"
        placeholder="Search..."
        className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all duration-300 ease-in-out"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
    </div>
      </SidebarHeader>
      <SidebarContent>
        <NavHistory user={user} />
      </SidebarContent>
      <SidebarFooter>
      <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
