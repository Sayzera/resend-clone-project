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
import React, { useEffect, useState } from 'react'
import TableItem from "./table-row"
import { getRegisterUserFromCookies } from "@/components/auth/register"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
type Props = {}

type userItemType = {
  name: string;
  surname: string;
  age: string;
  email: string;
  password: string;
}

export default function UserList({ }: Props) {
  const users = getRegisterUserFromCookies('users')
  const [mounted, setMounted] = useState<boolean>(false);

  const [userData, setUserData] = useState<userItemType[]>(users)
  const [openModal, setOpenModal] = useState<boolean>(false)



  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return

  // function checkDuplicateEmail(users) {
  //   const emailSet = new Set<string>();
  //   const uniqueUsers = [];

  //   for (const user of users) {
  //     if (!emailSet.has(user.email)) {
  //       emailSet.add(user.email);
  //       uniqueUsers.push(user);
  //     }
  //   }



  //   return uniqueUsers;
  // }



  // const uniqueUsers =users

  return (
    <div>
      <Dialog open={openModal} onOpenChange={() => {
        setOpenModal(false)
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

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
                <TableHead className="w-[150px]">Password</TableHead>
                <TableHead className="w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userData?.map((user: userItemType, index: number) => (
                <TableItem key={index} user={user} users={users} index={index} setUserData={setUserData} 
                setOpenModal={setOpenModal}
                 />
              ))}

            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}