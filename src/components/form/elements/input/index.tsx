import React from 'react'
import { IoMdClose } from "react-icons/io";

type Props = {
    label: string
    type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'file'
    error?: string

}

function Input({
    label,
    type = 'text',
    error
}: Props) {
    return (
        <div className='my-2'>
            <span className='font-bold'>{label}</span>
            {/* border-transparent focus:border-transparent focus:ring-0 */}
            <input
                className={`p-3 bg-gray-100 rounded-lg w-full mt-2 focus:outline-none 
                    ${error ? 'border border-red-500' : null}`}
                type={type}
            />

            {/* {
                error ? (
                    <div>
                    <p>{error}</p>
                </div>
                ) : null
            } */}

            {
                error && (
                    <div className='relative'>
                        <p className='text-sm text-red-500'>{error}</p>
                        <IoMdClose className='absolute top-[-35px] right-[7px] text-red-500' />
                    </div>
                )
            }


        </div>
    )
}

export default Input