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
import { DataContext } from "@/provider/spaceContext"

import SpacesDialog from "./custom/spacesDialog"
import { GlareCard } from "./ui/glare-card"
import { fetchData } from "@/lib/spaces"


export function Spaces() {
  const [spacesData, setSpacesData] = React.useState([]);
  const [popOver, setPopOver] = React.useState(true);
  const [openSpace, setOpenSpace] = React.useState([]);
    // eslint-disable-next-line import/no-named-as-default-member
    const context = React.useContext(DataContext);
    if(!context){
      throw new Error("DataInput must be used within a DataProvider");
    }
    const {data} = context;
    // console.log("data", data);

    React.useEffect(() => {
      try {
        const call = async () => {
          const res = await fetchData();
          setSpacesData(res);
        }
        call();
      } catch (error) {
        toast.error("errro fetch spaces");
      }
    }, [])

    function showpopOver(name, id){
      // console.log("i am clicked here show popover")
      setPopOver(!popOver);
      console.log(popOver);
      setOpenSpace([name, id]);
    }

  return (
    <>
      {data.length == 0 ? spacesData.map((space, index) => (
        <React.Fragment key={index}>
        <SidebarGroup className="p-2">
            <GlareCard onClick={() => showpopOver(space.name, space.id)} name={space.name} icon={space.icon} num={index = index+1} />
        </SidebarGroup>
        <div className={`fixed inset-0 z-50 bg-black/50 ${popOver ? "hidden" : "" } data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0`}>
            <div className={`fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[80vw] h-[80vh] bg-[#18181B] rounded-2xl z-[80]`}>
              <SpacesDialog details={openSpace} />
            </div>
            </div>
      </React.Fragment>
      )) : data.map((space, index) => (
        <React.Fragment key={index}>
          <SidebarGroup key={index} className="p-2">
              <GlareCard onClick={showpopOver} name={space.name} icon={space.icon} num={index = index+1} />
          </SidebarGroup>
        </React.Fragment>
      ))}
    </>
  )
}
