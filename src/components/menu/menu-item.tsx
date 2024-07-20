'use client'

import React from 'react'
import { IconType } from 'react-icons'

type Props = {
    id:number
    name:string
    Icon:IconType
}

export default function MenuItem({
    id,
    name,
    Icon
}: Props) {
  return (
    <div className="flex items-center space-x-2 p-2 hover:bg-gray-600 hover:rounded-lg cursor-pointer transition-all delay-150"
    >
        <Icon className="text-gray-300 w-5 h-5" />
        <span className="text-gray-300">{name}</span>
    </div>
  )
}

export function Mahmut() {
  return <div className='bg-white'>Merhaba</div>
}
