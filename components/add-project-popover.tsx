'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export default function AddProjectPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Add Project</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="text-center p-4">
          <h3 className="font-semibold text-lg mb-2">UPCOMING Feature</h3>
          <p>The ability to add projects will be available soon!</p>
        </div>
      </PopoverContent>
    </Popover>
  )
}

