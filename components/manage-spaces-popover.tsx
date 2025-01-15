'use client'

import * as React from 'react'
import { Edit, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
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

export default function ManageSpacesPopover({ onClose }: ManageSpacesPopoverProps) {
  // This would typically come from your state management or API
  const [spaces, setSpaces] = React.useState<Space[]>([
    { id: '1', name: 'Space 1', icon: '🚀', projects: ['project1', 'project2'] },
    { id: '2', name: 'Space 2', icon: '🌟', projects: ['project3'] },
    { id: '3', name: 'Space 3', icon: '🌈', projects: [] },
  ])

  const [projects] = React.useState<Project[]>([
    { id: 'project1', name: 'Project 1' },
    { id: 'project2', name: 'Project 2' },
    { id: 'project3', name: 'Project 3' },
    { id: 'project4', name: 'Project 4' },
  ])

  const [editingSpace, setEditingSpace] = React.useState<Space | null>(null)

  const handleEdit = (space: Space) => {
    setEditingSpace(space)
  }

  const handleSaveEdit = (updatedSpace: Space) => {
    setSpaces(spaces.map(space => space.id === updatedSpace.id ? updatedSpace : space))
    setEditingSpace(null)
  }

  const handleDelete = (spaceId: string) => {
    setSpaces(spaces.filter(space => space.id !== spaceId))
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage Spaces</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {spaces.map((space) => (
            <div key={space.id} className="flex items-center justify-between p-2 border rounded">
              <div className="flex items-center space-x-2">
                <span>{space.icon}</span>
                <span>{space.name}</span>
              </div>
              <div className="space-x-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(space)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(space.id)}>
                  <Trash className="h-4 w-4" />
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

