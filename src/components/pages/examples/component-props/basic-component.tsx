'use client';

import React from 'react'

type Props = {
    deger:string,
    yetenegi: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function BasicComponent(props: Props) {
    
  return (
    <div className='z-50 '>BasicComponent - {props.deger}

        <input onChange={props.yetenegi} />
    
    </div>
  )
}