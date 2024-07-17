import React from 'react'
// menü
import { CiMail } from "react-icons/ci";
import { GrDownload } from "react-icons/gr";
import { IoPeople } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";
import { IoLogoBuffer } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { PiArrowsDownUpThin } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";


type Props = {}

function Menu({}: Props) {
  return (
    <nav className="mt-6  flex-1">
    <div className="flex items-center space-x-2 p-2 hover:bg-gray-600 hover:rounded-lg cursor-pointer transition-all delay-150">
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
    </div>

</nav>
  )
}

export default Menu