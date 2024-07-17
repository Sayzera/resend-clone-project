import React from 'react'
// Settings
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Props = {}

function Settings({ }: Props) {
    return (
        <div>
            <DropdownMenu >
                <DropdownMenuTrigger className="text-gray-300 w-full flex items-center space-x-2 hover:bg-gray-600 px-2 rounded-lg">
                    <div>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                    <span>example.gmail.com</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className=" w-[200px] bg-[#05050a] border-gray-500 ">
                    <DropdownMenuItem className="text-gray-300">Profile</DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-300">Billing</DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-300">Team</DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-300">Subscription</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}

export default Settings