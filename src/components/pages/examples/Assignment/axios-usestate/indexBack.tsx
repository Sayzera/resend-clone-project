'use client'
import React, { useEffect, useState } from 'react'
// menü
import { CiMail } from "react-icons/ci";
import { GrDownload } from "react-icons/gr";
import { IoPeople } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";
import { IoLogoBuffer } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { PiArrowsDownUpThin } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import axios from 'axios'
import MenuItem, { Mahmut as Mahmut2 } from '../../menu-item'; // export default function ve export function isimlendirme
import JsonItem from './json-item';



const menuItems = [
    {
        id: 1,
        icon: CiMail,
        name: 'Emails'
    },
    {
        id: 2,
        icon: GrDownload,
        name: 'Broadcasts'
    },
    {
        id: 3,
        icon: IoPeople,
        name: 'Audiences'
    },
    {
        id: 4,
        icon: TbWorld,
        name: 'Domains'
    },
    {
        id: 5,
        icon: IoLogoBuffer,
        name: 'Logs'
    },
    {
        id: 6,
        icon: CiLock,
        name: 'API Keys'
    },
    {
        id: 7,
        icon: PiArrowsDownUpThin,
        name: 'Webhooks'
    },
    {
        id: 8,
        icon: IoSettingsOutline,
        name: 'Settings'
    }
]


type Props = {}

function Menu({ }: Props) { // gelen verideki objenin tipleri tanimlanir (array objesi)
    // const [first10, setData] = useState<
    // {
    //     userId:number
    //     id:number
    //     title:string
    //     body:string
    // } []
    // >([]);

    // {
    //     "userId": 1,
    //     "id": 1,
    //     "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    //     "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    // }

    //     // let counter = 0;
    //     const [counter, setCounter] = useState(0) 
    //     const onClick = () => {
    //         setCounter(counter + 1)

    //         console.log(counter)
    //     }

    //     useEffect(() => {
    //         console.log(1)
    //         if(counter == 4) {
    //             alert('İşlem tamamlandı')
    //         }

    //     }, [counter])


    //     // axios.get('https://jsonplaceholder.typicode.com/posts').then((data) => {
    //     //     console.log(data.data, 'XXXXXx')
    //     // })





    // console.log(first10, 'data')





    // TODO: Loop
    return (
        <nav className="mt-6 flex-1">
            {
                menuItems?.map((item) => (
                    <MenuItem
                        id={item.id}
                        name={item.name}
                        Icon={item.icon}
                        key={item.id}
                    />
                ))
            }

            {/* <Mahmut2 /> */}



            {/* <div className="flex items-center space-x-2 p-2 hover:bg-gray-600 hover:rounded-lg cursor-pointer transition-all delay-150"
            >
                <CiMail className="text-gray-300 w-5 h-5" />
                <span className="text-gray-300">Emails</span>
            </div>
            <div className="flex items-center space-x-2 p-2 hover:bg-gray-600 hover:rounded-lg cursor-pointer transition-all delay-150">
                <GrDownload className="text-gray-300 w-5 h-5" />
                <span className="text-gray-300">Broadcasts</span>
            </div>
            <div className="flex items-center space-x-2 p-2 hover:bg-gray-600 hover:rounded-lg cursor-pointer transition-all delay-150">
                <IoPeople className="text-gray-300 w-5 h-5" />
                <span className="text-gray-300">Audiences</span>
            </div>
            <div className="flex items-center space-x-2 p-2 hover:bg-gray-600 hover:rounded-lg cursor-pointer transition-all delay-150">
                <TbWorld className="text-gray-300 w-5 h-5" />
                <span className="text-gray-300">Domains</span>
            </div>
            <div className="flex items-center space-x-2 p-2 hover:bg-gray-600 hover:rounded-lg cursor-pointer transition-all delay-150">
                <IoLogoBuffer className="text-gray-300 w-5 h-5" />
                <span className="text-gray-300">Logs</span>
            </div>
            <div className="flex items-center space-x-2 p-2 hover:bg-gray-600 hover:rounded-lg cursor-pointer transition-all delay-150">
                <CiLock className="text-gray-300 w-5 h-5" />
                <span className="text-gray-300">API Keys</span>
            </div>
            <div className="flex items-center space-x-2 p-2 hover:bg-gray-600 hover:rounded-lg cursor-pointer transition-all delay-150">
                <PiArrowsDownUpThin className="text-gray-300 w-5 h-5" />
                <span className="text-gray-300">Webhooks</span>
            </div>
            <div className="flex items-center space-x-2 p-2 hover:bg-gray-600 hover:rounded-lg cursor-pointer transition-all delay-150">
                <IoSettingsOutline className="text-gray-300 w-5 h-5" />
                <span className="text-gray-300">Settings</span>
            </div> */}

            {/* {
                first10?.map((item)=>{
                    return (
                        <JsonItem
                id={item.id}
                body={item.body}
                title={item.title}
                key={item.id}
            />
                    )
                })
            } */}

        </nav>
    )
}

export default Menu