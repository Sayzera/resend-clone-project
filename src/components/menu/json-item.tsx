'use client'

import React, { useState } from 'react'

type Props = {
    id:number
    body:string
    title:string
}

export default function JsonItem({
    id,
    body,
    title
}: Props) {
  const [counter, setCounter] = useState<number>(0)
  return (
    <div 
    onClick={()=>{
      setCounter(counter+1)
    }}
    className='bg-white'>
    {id} {body} {title} {counter}
    </div>
    
  )
}
