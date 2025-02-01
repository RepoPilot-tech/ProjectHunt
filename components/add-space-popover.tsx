
'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import axios from 'axios'
import { DataContext } from "../provider/spaceContext";
import { toast } from 'sonner'

export default function AddSpacePopover() {
  const [spaceName, setSpaceName] = React.useState('')
  const [spaceIcon, setSpaceIcon] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const context = React.useContext(DataContext);
  if (!context) {
    throw new Error("DataInput must be used within a DataProvider");
  }

  const {addData} = context;

  async function addSpace(e: React.FormEvent){
    e.preventDefault()
    setLoading(true)
    // console.log("form space data", spaceName, spaceIcon);
    try{
      addData({spaceName, spaceIcon});
      setSpaceName("");
      setSpaceIcon("");
      // console.log('save success');
      toast.success("Space Created Successfully")
    }catch(e){
      // console.log("error occured while creating the space", e)
      toast.error("Space Created Successfully")
    }finally{
      setLoading(false)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Add Space</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form onSubmit={addSpace} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="space-name">Space Name</Label>
            <Input
              id="space-name"
              value={spaceName}
              onChange={(e) => setSpaceName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="space-icon">Space Icon (SVG code)</Label>
            <Input
              id="space-icon"
              value={spaceIcon}
              onChange={(e) => setSpaceIcon(e.target.value)}
              placeholder="Paste SVG code here"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>{loading ? "Saving..." : "Add Space"}</Button>
        </form>
      </PopoverContent>
    </Popover>
  )
}

