import React from 'react'
import {
    TableCell,
    TableRow,
} from "@/components/ui/table"

type UserItem = {
    name: string,
    surname: string,
    age: string,
    email: string
}

type Props = {
    user: UserItem
}

export default function TableItem({ user }: Props) {
    const { name, surname, age, email } = user
    return (
        <TableRow>
            <TableCell>{name}</TableCell>
            <TableCell>{surname}</TableCell>
            <TableCell>{age}</TableCell>
            <TableCell>{email}</TableCell>
        </TableRow>
    )
}