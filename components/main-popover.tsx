'use client'

import * as React from 'react'
import { Plus, PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import AddProjectPopover from './add-project-popover'
import AddSpacePopover from './add-space-popover'
import ManageSpacesPopover from './manage-spaces-popover'

export default function MainPopover() {
  const [openPopover, setOpenPopover] = React.useState<string | null>(null)
  return (
    <Popover open={openPopover === 'main'} onOpenChange={(open) => setOpenPopover(open ? 'main' : null)}>
      <PopoverTrigger className="flex text-white justify-between items-center gap-6 px-6 hover:gap-12 duration-200 ease-in-out bg-gray-700 hover:bg-gray-800 w-fit p-2 rounded-full">
      <h1>Spaces</h1>
      <PlusIcon />
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <div className="flex flex-col space-y-2">
          <AddSpacePopover />
          <Button variant="outline" onClick={() => setOpenPopover('manage')}>
            Manage Spaces
          </Button>
          <AddProjectPopover />
        </div>
      </PopoverContent>
      {openPopover === 'manage' && <ManageSpacesPopover onClose={() => setOpenPopover(null)} />}
    </Popover>
  )
}

