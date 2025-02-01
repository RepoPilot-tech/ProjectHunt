import Link from 'next/link'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu'
import { Button } from './button'
import { CornerDownRight, MoreVertical, PenSquare } from 'lucide-react'
import { Badge } from './badge'
import { WobbleCard } from './wobble-card'

const Mansorygrid = ({name, website, builder, image}) => {
  return (
        <WobbleCard containerClassName={'w-full h-full'} className={`${image ? "min-h-[30vh]" : "min-h-[20vh]"} w-full`}>
        <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-2xl font-semibold tracking-[-0.015em] text-white">
          {name}
        </h2>
        {/* <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
          If someone yells “stop!”, goes limp, or taps out, the fight is over.
        </p> */}
        {/* {image} */}
        <div className='absolute -right-2 -bottom-12 rounded-md w-[15vw] h-48 overflow-hidden'>
        <img src={image} alt="" />
        </div>
      </WobbleCard>
  )
}

export default Mansorygrid