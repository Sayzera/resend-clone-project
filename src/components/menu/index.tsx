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
import MenuItem from './menu-item';



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
    }
]


type Props = {}

function Menu({ }: Props) {
    const [data,setData] = useState();

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

        useEffect(() => {
            getAllData();
        }, [])

       async function getAllData() {
        const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setData(data);

    }



    console.log(data, 'data')





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

        </nav>
    )
}

export default Menu