// import { useRouter } from "next/navigation";
import { User } from "next-auth";
import React, { ReactNode } from "react";

import { SidebarLeft } from "@/components/sidebar-left";
import { SidebarRight } from "@/components/sidebar-right";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DataProvider } from "@/provider/spaceContext";

import { auth } from "../(auth)/auth";

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
              {session?.user?.id && <SidebarLeft user={session.user as User & { id: string }} />}

                  <div className='w-full relative'>
                    {/* <NavBarDemo />/ */}
                      {children}
                  </div>
              <SidebarRight user={session?.user} />
            </DataProvider>
      </main>
      </SidebarProvider>
  );
};

export default Layout;
