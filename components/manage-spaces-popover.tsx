'use client'

import axios from 'axios'
import { Edit, Trash } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DataContext } from '@/provider/spaceContext'

import { EditSpaceDialog } from './edit-space-dialog'

interface Space {
  id: string
  name: string
  icon: string
  projects: string[]
}

interface Project {
  id: string
  name: string
}

interface ManageSpacesPopoverProps {
  onClose: () => void
}

export default function ManageSpacesPopover({ onClose, spacesData }: ManageSpacesPopoverProps) {

  // console.log("manage spaces component", spacesData);

  const [editingSpace, setEditingSpace] = React.useState<Space | null>(null)

  const handleEdit = (space: Space) => {
    setEditingSpace(space)
  }

  const handleSaveEdit = (updatedSpace: Space) => {
    setEditingSpace(null);                
  }


  const handleDelete = async (spaceId: string) => {
    console.log("here i am", spaceId);
    try {
      const res = await axios.post("/api/space/deleteSpace", { spaceId });
      console.log(res);
    } catch (error) {
      console.log("error when making api call", error);
      return new Response("An error occurred while deleting your space", {
        status: 500,
      });
    } 
  }


  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#18181B]">
        <DialogHeader>
          <DialogTitle>Manage Spaces</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {spacesData.map((space: Space) => (
            <div key={space.id} className="hideit flex items-center justify-between p-2 border rounded">
              <div className="flex items-center space-x-2">
                <span>{space.icon}</span>
                <span>{space.name}</span>
              </div>
              <div className="space-x-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(space)}>
                  <Edit className="size-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(space.id)}>
                  <Trash className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
      {editingSpace && (
        <EditSpaceDialog
          space={editingSpace}
          projects={projects}
          onSave={handleSaveEdit}
          onClose={() => setEditingSpace(null)}
        />
      )}
    </Dialog>
  )
}

