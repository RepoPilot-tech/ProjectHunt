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

import { GlareCard } from "./ui/glare-card"
import SpacesDialog from "./custom/spacesDialog"


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
    console.log("data", data);

    React.useEffect(() => {
      // console.log("calingg.....")
      try {
        async function fetchData() {
          const res = await axios.get("/api/space/fetchSpaces")
          // console.log("rs from get", res);
          setSpacesData(res.data);
        }
        fetchData();
      } catch (error) {
        toast.error("errro fetch spaces");
      }
    }, [])
    // console.log("spaces to send", spacesData);

    function showpopOver(name, id){
      setPopOver(!popOver);
      setOpenSpace([name, id]);
    }

  return (
    <>
      {data.length == 0 ? spacesData.map((space, index) => (
        <React.Fragment key={index}>
        <SidebarGroup className="p-2">
            <GlareCard onClick={() => showpopOver(space.name, space.id)} name={space.name} icon={space.icon} num={index = index+1} />
        </SidebarGroup>
            <div className={`absolute top-1/2 left-1/2  ${popOver ? "hidden" : "" } translate-x-[-50%] translate-y-[-50%] w-[80vw] h-[80vh] bg-gray-400 rounded-2xl z-[80]`}>
              <SpacesDialog details={openSpace} />
            </div>
      </React.Fragment>
      )) : data.map((space, index) => (
        <React.Fragment key={index}>
          <SidebarGroup key={index} className="p-2">
              <GlareCard onClick={showpopOver} name={space.name} icon={space.icon} num={index = index+1} />
          </SidebarGroup>
          {/* <SidebarSeparator className="mx-0" /> */}
        </React.Fragment>
      ))}
    </>
  )
}
