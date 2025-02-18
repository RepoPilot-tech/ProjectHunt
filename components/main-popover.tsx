'use client'

import { Plus, PlusIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import AddProjectPopover from './add-project-popover'
import AddSpacePopover from './add-space-popover'
import ManageSpacesPopover from './manage-spaces-popover'
import { DataContext } from '@/provider/spaceContext'
import { fetchData } from '@/lib/spaces'
import { toast } from 'sonner'

export default function MainPopover() {
  const [openPopover, setOpenPopover] = React.useState<string | null>(null)
  const [spacesData, setSpacesData] = React.useState([])
  const context = React.useContext(DataContext)
  if(!context){
    throw new Error("DataInput must be used within a DataProvider");
  }
  const {data} = context;

    // console.log("data", data);

    React.useEffect(() => {
      try {
        const call = async () => {
          const res = await fetchData();
          setSpacesData(res);
        }
        call();
      } catch (error) {
        toast.error("errro fetch spaces");
      }
    }, [])

  return (
    <Popover open={openPopover === 'main'} onOpenChange={(open) => setOpenPopover(open ? 'main' : null)}>
      <PopoverTrigger className="flex text-white justify-between items-center gap-6 px-6 hover:gap-12 duration-200 ease-in-out bg-gray-700 hover:gradient w-fit p-2 rounded-full">
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
      {openPopover === 'manage' && <ManageSpacesPopover spacesData={spacesData} onClose={() => setOpenPopover(null)} />}
    </Popover>
  )
}

