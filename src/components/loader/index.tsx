'use client'

import React from 'react'
import { LuLoader2 } from "react-icons/lu";

type Props = {
    children: React.ReactNode
    isLoading:boolean
}

export default function Loader({
    children,
    isLoading
}: Props) {

    // sayfa hazır değilse 
    if(isLoading) {
        return (
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
                <LuLoader2
                 className='animate-spin h-8 w-8'
                />
            </div>
        )
    }

  return (
        <>{children}</>
  )
}