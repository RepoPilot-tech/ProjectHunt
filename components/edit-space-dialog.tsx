'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

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

interface EditSpaceDialogProps {
  space: Space
  projects: Project[]
  onSave: (updatedSpace: Space) => void
  onClose: () => void
}

export function EditSpaceDialog({ space, projects, onSave, onClose }: EditSpaceDialogProps) {
  const [name, setName] = React.useState(space.name)
  const [icon, setIcon] = React.useState(space.icon)
  const [selectedProjects, setSelectedProjects] = React.useState<string[]>(space.projects)

  const handleSave = () => {
    onSave({
      ...space,
      name,
      icon,
      projects: selectedProjects
    })
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Space</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="icon" className="text-right">
              Icon
            </Label>
            <Input
              id="icon"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className="col-span-3"
              placeholder="Paste SVG code or emoji"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="projects" className="text-right">
              Projects
            </Label>
            <Select
              onValueChange={(value) => setSelectedProjects((prev) => [...prev, value])}
              value={selectedProjects[selectedProjects.length - 1]}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select projects" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedProjects.length > 0 && (
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-start-2 col-span-3">
                {selectedProjects.map((projectId) => (
                  <Button
                    key={projectId}
                    variant="secondary"
                    size="sm"
                    className="m-1"
                    onClick={() => setSelectedProjects((prev) => prev.filter((id) => id !== projectId))}
                  >
                    {projects.find((p) => p.id === projectId)?.name} ✕
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

