import * as React from "react"
import { Check, ChevronRight } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { GlareCard } from "./ui/glare-card"

export function Spaces({
  spaces,
}: {
  spaces: {
    name: string
    items: string[]
  }[]
}) {
  return (
    <>
      {spaces.map((space, index) => (
        <React.Fragment key={space.name}>
          <SidebarGroup key={space.name} className="p-2">
              <GlareCard name={space.name} num={index = index+1} />
          </SidebarGroup>
          {/* <SidebarSeparator className="mx-0" /> */}
        </React.Fragment>
      ))}
    </>
  )
}
