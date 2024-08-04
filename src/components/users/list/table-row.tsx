import React, { Dispatch, SetStateAction, useState } from 'react'
import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { RiDeleteBin6Line } from "react-icons/ri";
import { Button } from '@/components/ui/button';
import { FiEdit } from "react-icons/fi";
import Cookies from 'js-cookie'


type UserItem = {
    name: string,
    surname: string,
    age: string,
    email: string,
    password: string
}

type Props = {
    user: UserItem
    index: number
    setUserData: Dispatch<SetStateAction<UserItem[]>>
    setOpenModal: Dispatch<SetStateAction<boolean>>
    users: UserItem[]
    setRowStateData:Dispatch<SetStateAction<UserItem | null>>
    setRowStateIndex:Dispatch<SetStateAction<number | null>>
}

export default function TableItem({ user, index, setUserData, users, setOpenModal,setRowStateData,setRowStateIndex }: Props) {
    const { name, surname, age, email, password } = user


    const deleteItem = (index: number) => {
        // users.splice(index, 1)
        let newUsersData = users.filter((_, i) => i !== index)

        Cookies.set('users', JSON.stringify(newUsersData))

        setUserData(newUsersData)


    }
    return (
    <>
   
        <TableRow>
            <TableCell>{name}</TableCell>
            <TableCell>{surname}</TableCell>
            <TableCell>{age}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{'*'.repeat(password.length)}</TableCell>
            <TableCell>
                <div className='sm:space-y-2 xl:space-x-2 '>
                    <Button className='md:bg-gradient-to-r md:from-blue-700 md:to-blue-400
                    sm:bg-gradient-to-r sm:from-red-700 sm:to-red-400
                    
                    '
                        onClick={() => {
                            setOpenModal(true)
                            setRowStateData(user)
                            setRowStateIndex(index)

                        }}
                    >
                        <FiEdit className='h-4 w-4' />
                    </Button>
                    <Button className='bg-gradient-to-r from-red-700 to-red-400' onClick={() => deleteItem(index)}>
                        <RiDeleteBin6Line className='h-4 w-4' />
                    </Button>
                </div>

            </TableCell>
        </TableRow>
    </>
    )
}