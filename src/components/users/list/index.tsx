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
  const users = getRegisterUserFromCookies('users');
  const [mounted, setMounted] = useState<boolean>(false);
  const [userData, setUserData] = useState<userItemType[]>(users);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editingMode, setEditingMode] = useState<boolean>(true);
  const [selectedUser, setSelectedUser] = useState<userItemType | null>(null);

  useEffect(() => {
    setMounted(true)
  }, [])

  const editValues = () => {
    if (selectedUser) {
      
    }
  }

  if (!mounted) return // null yazabilir miydik diye sor  

  return (
    <div>
      <Dialog open={openModal} onOpenChange={() => {
        setOpenModal(false)
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editing the User Details</DialogTitle>
            <DialogDescription>
              {editingMode && (
                <>
                <input type="text" value={userData[0].name} />
                <input type="text" value={userData[0].surname} />
                <input type="text" value={userData[0].age} />
                <input type="text" value={userData[0].email} />
                <input type="text" value={userData[0].password} />
                <button onClick={editValues}>Edit</button>
                </>
              )}
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
                setOpenModal={setOpenModal} // SOR
                 />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}