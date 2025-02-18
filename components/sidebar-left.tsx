import {
  AudioWaveform,
  Blocks,
  Calendar,
  Command,
  Github,
  Home,
  Inbox,
  Linkedin,
  MessageCircleQuestion,
  Search,
  Settings2,
  Sparkles,
  Trash2,
  Twitter,
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
    <Sidebar className="border-r-2 rounded-r-3xl overflow-hidden">
      <SidebarHeader>
        <h1 className="truncate text-[2.4rem] font-semibold w-full text-center font-cabin">Project Hunt</h1>
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
      {/* <NavUser user={user} /> */}
      <div className="w-full bg-black font-cabin text-lg rounded-2xl flex items-center justify-between p-4">
        <span className="">Build by</span>
        <div className="flex gap-2">
          <a href="https://x.com/l_fahadkhan_l" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-lg bg-[#18181B] hover:bg-[#2f2f32] duration-200 ease-in-out rounded-full">
          𝕏
          </a>
          {/* <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="px-4 py-3 bg-[#18181B] rounded-full">
            <Linkedin className="text-gray-200" size={18} />
          </a> */}
          <a href="https://github.com/Fahad-Dezloper" target="_blank" rel="noopener noreferrer" className="px-4 py-2 flex items-center justify-center bg-[#18181B] hover:bg-[#2f2f32] rounded-full">
            <Github className="text-gray-200" size={18} />
          </a>
        </div>
      </div>
      </SidebarFooter>
    </Sidebar>
  )
}
