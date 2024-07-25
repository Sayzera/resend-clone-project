'use client'
import React from 'react'

import { CiMail } from "react-icons/ci";
import { GrDownload } from "react-icons/gr";
import { IoPeople } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";
import { IoLogoBuffer } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { PiArrowsDownUpThin } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import MenuItem from './menu-item'; // export default function ve export function isimlendirme


const menuItems = [
    {
        id: 1,
        icon: CiMail,
        name: 'Emails',
        path: '/emails'
    },
    {
        id: 2,
        icon: GrDownload,
        name: 'Broadcasts',
        path: '/broadcasts'
    },
    {
        id: 3,
        icon: IoPeople,
        name: 'Audiences',
        path: '/audiences'
    },
    {
        id: 4,
        icon: TbWorld,
        name: 'Domains',
        path: '/domains'
    },
    {
        id: 5,
        icon: IoLogoBuffer,
        name: 'Logs',
        path: '/logs'
    },
    {
        id: 6,
        icon: CiLock,
        name: 'API Keys',
        path: '/apikeys'
    },
    {
        id: 7,
        icon: PiArrowsDownUpThin,
        name: 'Webhooks',
        path: '/webhooks'
    },
    {
        id: 8,
        icon: IoSettingsOutline,
        name: 'Settings',
        path: '/settings'
    }
]

type Props = {}

function Menu({ }: Props) { // gelen verideki objenin tipleri tanimlanir (array objesi)
    return (
        <nav className="mt-6 flex-1">
            {
                menuItems?.map((item) => (
                    <MenuItem
                        id={item.id}
                        name={item.name}
                        Icon={item.icon}
                        menuPath={item.path}

                        key={item.id}
                    />
                ))
            }

        </nav>
    )
}

export default Menu