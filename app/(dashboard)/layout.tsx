import React, { ReactNode } from "react";
import { auth } from "../(auth)/auth";
import { SidebarLeft } from "@/components/sidebar-left";
import { SidebarRight } from "@/components/sidebar-right";
import { SidebarProvider } from "@/components/ui/sidebar";

type LayoutProps = {
  children: ReactNode;
};

const Layout = async ({ children }: {children: React.ReactNode}) => {
      let session = await auth()
  return (
    <SidebarProvider>
    <main className='flex justify-between w-full'>
              <SidebarLeft user={session?.user} />
                  <div className=''>
                      {children}
                  </div>
              <SidebarRight user={session?.user} />
      </main>
      </SidebarProvider>
  );
};

export default Layout;
