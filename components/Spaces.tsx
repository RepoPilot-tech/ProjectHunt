"use client"
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
import { DataContext } from "@/provider/spaceContext"
import { toast } from "sonner"
import axios from "axios"

export function Spaces() {
  const [spacesData, setSpacesData] = React.useState([]);
    // eslint-disable-next-line import/no-named-as-default-member
    const context = React.useContext(DataContext);
    if(!context){
      throw new Error("DataInput must be used within a DataProvider");
    }
    const {data} = context;
    console.log("data", data);

    React.useEffect(() => {
      console.log("calingg.....")
      try {
        async function fetchData() {
          const res = await axios.get("/api/space/fetchSpaces")
          console.log("rs from get", res);
          setSpacesData(res.data);
        }
        fetchData();
      } catch (error) {
        toast.error("errro fetch spaces");
      }
    }, [])
    console.log("spaces to send", spacesData);


  return (
    <>
      {data.length == 0 ? spacesData.map((space, index) => (
        <React.Fragment key={space.name}>
        <SidebarGroup key={space.name} className="p-2">
            <GlareCard name={space.name} icon={space.icon} num={index = index+1} />
        </SidebarGroup>
        {/* <SidebarSeparator className="mx-0" /> */}
      </React.Fragment>
      )) : data.map((space, index) => (
        <React.Fragment key={space.name}>
          <SidebarGroup key={space.name} className="p-2">
              <GlareCard name={space.name} icon={space.icon} num={index = index+1} />
          </SidebarGroup>
          {/* <SidebarSeparator className="mx-0" /> */}
        </React.Fragment>
      ))}
    </>
  )
}
