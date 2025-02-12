"use client"

import {
  ArrowUpRight,
  Link2,
  LucideMessageCircleDashed,
  MoreHorizontal,
  SparklesIcon,
  StarOff,
  Trash2,
} from "lucide-react";
import Link from 'next/link';
import { useParams, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import useSWR from "swr"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { fetcher, getTitleFromChat } from "@/lib/utils"

import { PencilEditIcon } from "./custom/icons"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button"

export function NavHistory({user}) {
  const { isMobile } = useSidebar()
  const {id} = useParams();
  const pathname = usePathname();

  const {
    data: history,
    isLoading,
    mutate,
  } = useSWR<Array<any>>(user ? "/api/history" : null, fetcher, {
    fallbackData: [],
  })

  useEffect(() => {
    mutate();
  }, [pathname, mutate]);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = async () => {
    const deletePromise = fetch(`/api/chat?id=${deleteId}`, {
      method: "DELETE",
    });

    toast.promise(deletePromise, {
      loading: "Deleting chat...",
      success: () => {
        mutate((history) => {
          if (history) {
            return history.filter((h) => h.id !== id);
          }
        });
        return "Chat deleted successfully";
      },
      error: "Failed to delete chat",
    });

    setShowDeleteDialog(false);
  };

  return (
    <>
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      {user && (
          <Link href="/" className="flex gap-3 items-center border justify-center py-2 px-4 rounded-xl dark:text-black bg-gray-200 hover:bg-gray-300 duration-200">
                <div>Search for a new tool</div>
                <SparklesIcon />
          </Link>
      )}

      <SidebarGroupLabel className="flex justify-between mb-3">
        Workspace 
        <span>{history === undefined ? "loading" : history.length} chats</span>
      </SidebarGroupLabel>
      <SidebarMenu>
        {history && history?.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton asChild>
              <a href={`/chat/${item.id}`}>
                <span>{getTitleFromChat(item)}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
               
                <DropdownMenuItem>
                  <Link2 className="text-muted-foreground" />
                  <span>Copy Link</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ArrowUpRight className="text-muted-foreground" />
                  <span>Open in New Tab</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                  setDeleteId(item.id);
                  setShowDeleteDialog(true);
                }}>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>

<AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
<AlertDialogContent>
  <AlertDialogHeader>
    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
    <AlertDialogDescription>
      This action cannot be undone. This will permanently delete your
      chat and remove it from our servers. <br />
      <strong>(But your projects will remain safe which you have saved)</strong>
    </AlertDialogDescription>
  </AlertDialogHeader>
  <AlertDialogFooter>
    <AlertDialogCancel>Cancel</AlertDialogCancel>
    <AlertDialogAction onClick={handleDelete}>
      Continue
    </AlertDialogAction>
  </AlertDialogFooter>
</AlertDialogContent>
</AlertDialog>
</>
  )
}
