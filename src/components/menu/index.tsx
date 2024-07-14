import React from 'react'
// menü
import { CiMail } from "react-icons/ci";
import { GrDownload } from "react-icons/gr";
import { RiSoundModuleFill } from "react-icons/ri";


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
        <RiSoundModuleFill className="text-gray-300 w-5 h-5" />
        <span className="text-gray-300">Auidences</span>
    </div>

</nav>
  )
}

export default Menu