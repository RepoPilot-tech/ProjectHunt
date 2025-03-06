/* eslint-disable tailwindcss/no-unnecessary-arbitrary-value */
"use client"
import axios from "axios"
import { Check, ChevronRight } from "lucide-react"
import * as React from "react"
import { toast } from "sonner"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { fetchData } from "@/lib/spaces"
import { DataContext } from "@/provider/spaceContext"

import SpacesDialog from "./custom/spacesDialog"
import { GlareCard } from "./ui/glare-card"



export function Spaces() {
  const [spacesData, setSpacesData] = React.useState<{ id: string; name: string; icon: string }[]>([]);
  const [popOver, setPopOver] = React.useState(true);
  const [openSpace, setOpenSpace] = React.useState(null);
    // eslint-disable-next-line import/no-named-as-default-member
    const context = React.useContext(DataContext);
    if(!context){
      throw new Error("DataInput must be used within a DataProvider");
    }
    const {data} = context;

    React.useEffect(() => {
      const call = async () => {
        try {
          const res = await fetchData();
          setSpacesData(res);
        } catch (error) {
          toast.error("Error fetching spaces");
        }
      };
      call();
    }, [data]);

    function showpopOver(spaceId: any) {
      setOpenSpace(prev => (prev === spaceId ? null : spaceId));
    }

  return (
    <>
      {Array.isArray(spacesData) && spacesData.length > 0 ? (
  spacesData.map((space, index) => (
    <React.Fragment key={index}>
      <SidebarGroup className="p-2">
        <GlareCard onClick={() => showpopOver(space.id)} name={space.name} icon={space.icon} num={index + 1} />
      </SidebarGroup>
      {openSpace === space.id && (
        <div className="fixed inset-0 z-50 bg-black/50">
          <div className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[80vw] h-[80vh] bg-[#18181B] rounded-2xl z-[80]">
            <SpacesDialog spaceName={space.name} spaceIdd={space.id} setPopOver={setOpenSpace} popOver={openSpace} />
          </div>
        </div>
      )}
    </React.Fragment>
  ))
) : (
  <div>Loading...</div>
)}
    </>
  )
}
