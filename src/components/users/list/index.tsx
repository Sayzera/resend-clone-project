'use client'

import {
  Table,
  TableBody,
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
import TableItem from "./table-row"
import { getRegisterUserFromCookies } from "@/components/auth/register"

type Props = {}

export default function UserList({ }: Props) {
  const users = getRegisterUserFromCookies('users')

  function checkDuplicateEmail(users) {
    const emailSet = new Set<string>();
    const uniqueUsers = [];
    
    for (const user of users) {
      if (!emailSet.has(user.email)) {
        emailSet.add(user.email);
        uniqueUsers.push(user);
      }
    }
    return uniqueUsers;
  }

  const uniqueUsers = checkDuplicateEmail(users);

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
              {uniqueUsers?.map((user) => (
                <TableItem user = {user} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}