import React from 'react'
import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
type Props = {}

export default function TableItem({ }: Props) {
    return (
        <TableRow>
            <TableCell>Paid</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Paid</TableCell>
        </TableRow>
    )
}