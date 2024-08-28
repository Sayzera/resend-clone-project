'use client'

import React, { useEffect, useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { destroySession } from '@/actions/auth/logout';
import { getSession } from '@/actions/auth/session-action';
import { IronSession } from 'iron-session';
import { SessionData } from '@/lib/session';

function Settings({}) {
    const [session, setSession] = useState<IronSession<SessionData> | null>(null);
    useEffect(()=>{
        const fetchSession = async () => {
            try {
                const sessionData = await getSession();
                setSession(sessionData);
            } catch {
                console.log('error');
            }
        }
        fetchSession();
    }, []);

    const destroySessionMethod = async () => {
        try {
            await destroySession();
        } catch (error) {
            console.error('Error during destroySession:', error);
        }
    }

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
                    <span>{session?.userName}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className=" w-[200px] bg-[#05050a] border-gray-500 ">
                    {/* <DropdownMenuItem className="text-gray-300">Profile</DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-300">Billing</DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-300">Team</DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-300">Subscription</DropdownMenuItem> */}
                    <DropdownMenuItem className="text-gray-300" onClick={destroySessionMethod}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}

export default Settings