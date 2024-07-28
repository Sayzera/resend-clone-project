import Link from 'next/link'
import { IoSettingsOutline } from 'react-icons/io5'
import React from 'react'
// Settings
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IconType } from 'react-icons'
import { useRouter } from 'next/navigation'

type Props = {
    isActiveMenuItem: boolean
    Icon: IconType
    name: string
}

export default function MenuSubItem({
    isActiveMenuItem,
    Icon,
    name
}: Props) {
    const router = useRouter()


    return (
        <DropdownMenu >
            <DropdownMenuTrigger
                className={`flex items-center space-x-2 p-2 
                ${isActiveMenuItem ? 'bg-gray-600 rounded-lg' : null}
                 hover:bg-gray-600 hover:rounded-lg cursor-pointer transition-all delay-150 w-full` }
            >

                <Icon className="text-gray-300 w-5 h-5" />
                <span className="text-gray-300">{name}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" w-[200px] bg-[#05050a] border-gray-500 ">
                <DropdownMenuItem
                    onClick={() => {
                        router.push('/users/register')
                    }}
                    className="text-gray-300">Register</DropdownMenuItem>



                <DropdownMenuItem
                    onClick={() => {
                        router.push('/users/list')
                    }}
                    className="text-gray-300">User List</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}