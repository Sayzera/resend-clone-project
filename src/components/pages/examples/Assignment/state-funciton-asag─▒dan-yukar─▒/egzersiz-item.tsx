import { Button } from '@/components/ui/button'
import { User } from '@prisma/client'
import React from 'react'

type Props = {
    item: User
    onClick: (id: string) => void
    showId:string | null
    setShowId:React.Dispatch<React.SetStateAction<string | null>>
}

export default function Item({ item, onClick, showId,setShowId}: Props) {
    return (
        <li
        className='hover:text-red-500 hover:bg-red-300' onClick={() => {
            onClick(item.id)
            setShowId(item.id)
        }} >{item.age} - {item.email} - {item.name}         </li>
    )
}