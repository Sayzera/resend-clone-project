import React from 'react'

type Props = {}

function Navbar({}: Props) {
  return (
    <div class="flex space-x-10 ml-10">
    <div class="bg-blue-500 p-4 text-white">About</div>
    <div class="bg-green-500 p-4 text-white">Blog</div>
    <div class="bg-red-500 p-4 text-white">Customers</div>
    <div class="bg-blue-500 p-4 text-white">Resources</div>
    <div class="bg-green-500 p-4 text-white">Docs</div>
    <div class="bg-red-500 p-4 text-white">Pricing</div>
  </div>
  )
}

export default Navbar