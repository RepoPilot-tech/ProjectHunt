// import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

import { SidebarLeft } from "@/components/sidebar-left";
import { SidebarRight } from "@/components/sidebar-right";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DataProvider } from "@/provider/spaceContext";

import { auth } from "../(auth)/auth";
import Link from "next/link";
import { NavBarDemo } from "@/components/custom/nav";

type LayoutProps = {
  children: ReactNode;
};

const Layout = async ({ children }: {children: React.ReactNode}) => {
  // const router = useRouter();
  let session = await auth()
  if(!session){
    // Router.push("/home");
  }
  return (
    <SidebarProvider>
    <main className='flex gap-2 w-screen'>
      <DataProvider>
              <SidebarLeft user={session?.user} />
                  <div className='w-full relative'>
                    <NavBarDemo />
                      {children}
                  </div>
              <SidebarRight user={session?.user} />
            </DataProvider>
      </main>
      </SidebarProvider>
  );
};

export default Layout;
