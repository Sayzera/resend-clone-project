import React from 'react';
import { IoMdClose } from "react-icons/io";

type Props = {
    label?: string
    type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'file' | 'radio' | 'checkbox' | 'textarea' | 'button'
    id?: string
    name?: string
    value?: string
    rows?: number
    cols?: number
    error?: string
    btnType?: 'button' | 'submit' | 'reset'
    onChange?: (e:React.FormEvent<HTMLInputElement>) => void
}

function Input({
    label,
    type = 'text',
    id,
    name,
    value,
    rows,
    cols,
    error,
    btnType,
    onChange
}: Props) {

    return (
        <div className='my-2'>

            {type === 'radio' || type === 'checkbox' ? (
                <>
                    <input
                        onChange={onChange}
                        className={`mr-2 ${error ? 'border border-red-500' : ''}`}
                        type={type}
                        id={id}
                        name={name}
                        value={value}
                    />
                    <label htmlFor={id}>{label}</label>
                </>
            ) : type === 'textarea' ? (
                <>
                    <span className='font-bold'>{label}</span>
                    <textarea
                        className={`p-3 bg-gray-100 rounded-lg w-full mt-2 focus:outline-none 
                            ${error ? 'border border-red-500' : ''}`}
                        id={id}
                        name={name}
                        value={value}
                        rows={rows}
                        cols={cols}
                    />
                </>
            ) : type === 'text' ? (
                (
                    <>
                        <span className='font-bold'>{label}</span>
                        <input
                            className={`p-3 bg-gray-100 rounded-lg w-full mt-2 focus:outline-none 
                                ${error ? 'border border-red-500' : ''}`}
                            type={type}
                            id={id}
                            name={name}
                            value={value}
                        />
                    </>
                )
            ) : type === 'button' ? (
                <button type={btnType}>{label}</button>
            ): null
            
            }
            {error && (
                <div className='relative'>
                    <p className='text-sm text-red-500'>{error}</p>
                    <IoMdClose className='absolute top-[-35px] right-[7px] text-red-500' />
                </div>
            )}
        </div>
    )
}

export default Input;
