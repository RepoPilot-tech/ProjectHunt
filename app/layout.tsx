import { Metadata } from "next";
import { Toaster } from "sonner";

import { ThemeProvider } from "@/components/custom/theme-provider";
import { SidebarLeft } from "@/components/sidebar-left";
import { SidebarRight } from "@/components/sidebar-right";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DataProvider } from "@/provider/spaceContext";
import { Cabin_Sketch , Roboto } from "next/font/google";

import "./globals.css";
import { auth } from "./(auth)/auth";

export const metadata: Metadata = {
  title: "Project Hunt",
  description: "ProjectHunt Place to find all your projects.",
};

const CabinSketch = Cabin_Sketch({
  subsets: ["latin"],
  variable: "--font-cabin",
  display: "swap",
  weight: ["400", "700"]
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});


export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  let session = await auth();

  return (
    <html lang="en">
      <body className={`${CabinSketch.variable} ${roboto.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <DataProvider>
              <main className="flex gap-2 w-screen">
                {/* <SidebarLeft user={session?.user} /> */}
                <div className="w-full">{children}</div>
                {/* <SidebarRight user={session?.user} /> */}
              </main>
            </DataProvider>
          </SidebarProvider>
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
