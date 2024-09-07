'use client'

import React, { Dispatch, SetStateAction } from 'react'
import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { RiDeleteBin6Line } from "react-icons/ri";
import { Button } from '@/components/ui/button';
import { FiEdit } from "react-icons/fi";
import { User } from '@prisma/client';
import { onDeleteUser, onGetByIdUser } from '@/actions/user';
import { roles } from "@/constants/roles";
import { Role } from "@prisma/client";
import { SessionData } from '@/lib/session';

type Props = {
    user: User
    index: number
    setUserData: Dispatch<SetStateAction<User[] | undefined>>
    setOpenModal: Dispatch<SetStateAction<boolean>>
    users: User[] | undefined
    setRowStateData: Dispatch<SetStateAction<User | null | any>>
    setRowStateIndex: Dispatch<SetStateAction<number | null | string>>
    session: SessionData
}

export default function TableItem({ user, index, setUserData, users, setOpenModal, setRowStateData, setRowStateIndex, session }: Props) {
    const { name, surname, age, email, password, id } = user
    //console.log('Session:', session);
    let userRoles = session?.role && roles[session.role as Role] ? roles[session.role as Role] : [];
    //console.log('User Roles:', userRoles);

    const deleteItem = async (id: string) => {
        // users.splice(index, 1)
        // if(users?.length && users?.length > 0) {
        //     let newUsersData = users?.filter((_, i) => i !== index)
        //     Cookies.set('users', JSON.stringify(newUsersData))
        //     setUserData(newUsersData)
        // }

        const result = await onDeleteUser(id);

        if (result?.status === 200) {
            const newUsers = users?.filter((user) => user.id != id);
            setUserData(newUsers);

            // const users = await onGetUserList();
            // setUserData(users?.data);
        }
    }

    const getById = async (id: string) => {
        const result = await onGetByIdUser(id);
        if (result?.status == 200) {
            setRowStateData(result?.data);
        }
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
                        {
                            userRoles && userRoles?.length > 0 && userRoles.includes('UPDATE') ? (
                                <Button className='md:bg-gradient-to-r md:from-blue-700 md:to-blue-400
                    sm:bg-gradient-to-r sm:from-red-700 sm:to-red-400
                    '
                                    onClick={() => {
                                        setOpenModal(true)
                                        // setRowStateData(user)
                                        getById(id);
                                        setRowStateIndex(index)
                                    }}
                                >
                                    <FiEdit className='h-4 w-4' />
                                </Button>
                            ) : (
                                <div className="text-red-500">You are not authorized to perform this action.</div>
                            )
                        }

                        {
                            userRoles && userRoles?.length > 0 && userRoles.includes('DELETE') ? (
                                <Button className='bg-gradient-to-r from-red-700 to-red-400' onClick={() => deleteItem(id)}>
                                    <RiDeleteBin6Line className='h-4 w-4' />
                                </Button>
                            ) : (
                                <div className="text-red-500">You are not authorized to perform this action.</div>
                            )
                        }
                    </div>
                </TableCell>
            </TableRow>
        </>
    )
}