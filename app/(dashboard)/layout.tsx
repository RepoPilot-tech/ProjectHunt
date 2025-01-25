import React, { ReactNode } from "react";

import { SidebarLeft } from "@/components/sidebar-left";
import { SidebarRight } from "@/components/sidebar-right";
import { SidebarProvider } from "@/components/ui/sidebar";

import { auth } from "../(auth)/auth";

type LayoutProps = {
  children: ReactNode;
};

const Layout = async ({ children }: {children: React.ReactNode}) => {
      let session = await auth()
  return (
    <SidebarProvider>
    <main className='flex gap-2 w-screen'>
              <SidebarLeft user={session?.user} />
                  <div className='w-full'>
                      {children}
                  </div>
              <SidebarRight user={session?.user} />
      </main>
      </SidebarProvider>
  );
};

export default Layout;
