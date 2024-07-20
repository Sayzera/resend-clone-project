'use client'

import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons'
import { usePathname } from 'next/navigation'

type Props = {
  id: number
  name: string
  Icon: IconType
  menuPath: string

}

export default function MenuItem({
  id,
  name,
  Icon,
  menuPath
}: Props) {

  const pathname = usePathname();
  const isActiveMenuItem = !!pathname && pathname == menuPath;


  return (
    <Link href={menuPath}>
      <div
        className={`flex items-center space-x-2 p-2 
        ${isActiveMenuItem ? 'bg-gray-600 rounded-lg' : null}
         hover:bg-gray-600 hover:rounded-lg cursor-pointer transition-all delay-150` }
      >
        <Icon className="text-gray-300 w-5 h-5" />
        <span className="text-gray-300">{name}</span>
      </div>
    </Link>
  )
}

