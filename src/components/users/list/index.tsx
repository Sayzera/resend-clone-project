'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import React from 'react'
import TableItem from "./table-row"
import { getRegisterUserFromCookies } from "@/components/auth/register"

type Props = {}

interface UserItem  {
  name:string;
  surname:string;
  age:number | string;
  email: string;
}

export default function UserList({ }: Props) {
  const users = getRegisterUserFromCookies('users')
  console.log

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
          <CardDescription>
            Kayıt edilen kullanıcıları listeler
          </CardDescription>
        </CardHeader>
        <CardContent className="max-h-[500px] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead className="w-[100px]" >Surname</TableHead>
                <TableHead className="w-[100px]">Age</TableHead>
                <TableHead className="w-[150px]">Email</TableHead>
              
              </TableRow>
            </TableHeader>
            <TableBody>
            {
              users?.map((user:UserItem) => (
                <TableItem  />
              ))
            }
            
            

            </TableBody>
          </Table>
        </CardContent>

      </Card>

    </div>
  )
}