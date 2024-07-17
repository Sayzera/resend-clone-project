import React from 'react'

type Props = {}

function Navbar({ }: Props) {
  return (
    <div className='w-full flex justify-center'>
      <div className="flex space-x-10 ml-10">
        <div className="bg-blue-500 p-4 text-white">About</div>
        <div className="bg-green-500 p-4 text-white">Blog</div>
        <div className="bg-red-500 p-4 text-white">Customers</div>
        <div className="bg-blue-500 p-4 text-white">Resources</div>
        <div className="bg-green-500 p-4 text-white">Docs</div>
        <div className="bg-red-500 p-4 text-white">Pricing</div>
      </div>
    </div>
  )
}

export default Navbar