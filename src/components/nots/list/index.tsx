'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import React from 'react'
import { useState } from 'react';

type Props = {
  notes: {
    id: string,
    authorName: string,
    authorNote: string
  }
}

function NotsList({ notes }: Props) {

  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Note List</CardTitle>
        <CardDescription>
          Yazar ve notlarini listeler.
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[500px] overflow-y-auto"></CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Author Name</TableHead>
            <TableHead>Author Note</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card >
  )
}

export default NotsList;