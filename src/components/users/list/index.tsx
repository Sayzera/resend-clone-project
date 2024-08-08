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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Cookies from 'js-cookie'
import {Helmet} from "react-helmet";
import { User } from "@prisma/client"


type Props = {
  users : {
    data: User
  }
}

type rowStateDataType =
 null |
  {
    name?: string 
    surname?: string  
    age?: string 
    email?: string 
    password?: string 
  } 


export default function UserList({ users }: Props) {
  const [mounted, setMounted] = useState<boolean>(false);
  // databesden gelen veri
  const [userData, setUserData] = useState<User>(users.data);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [rowStateData, setRowStateData] = useState<rowStateDataType | null>(null)
  const [rowStateIndex, setRowStateIndex] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return

  const editValues = () => {
    if (rowStateIndex === null) {
      return
    }

    users[rowStateIndex] = rowStateData;
    setUserData(users)
    let data = rowStateData;

    Cookies.set('users',JSON.stringify(data));

  }

  return (
    <div>
    <Helmet>
    <meta charSet="utf-8" />
    <title>My Title</title>
     </Helmet>

      <Dialog open={openModal} onOpenChange={() => {
        setOpenModal(false)
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editing the User Details</DialogTitle>
            <DialogDescription>
              {(
                <>
                  <div className="space-y-2">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id='name' type="text" 
                      value={rowStateData?.name}
                      onChange={(e) => {
                        setRowStateData((prev:rowStateDataType) => ({
                          ...prev,
                          name: e.target.value
                        }))
                      }}
                      

                      />
                    </div>

                    <div>
                      <Label htmlFor="surname">Surname</Label>
                      <Input id='surname' type="text" value={rowStateData?.surname} 
                        onChange={(e) => {
                          setRowStateData((prev:rowStateDataType) => ({
                            ...prev,
                            surname: e.target.value
                          }))
                        }}
                      />
                    </div>

                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input id='age' type="text" value={rowStateData?.age} 
                        onChange={(e) => {
                          setRowStateData((prev:rowStateDataType) => ({
                            ...prev,
                            age: e.target.value
                          }))
                        }}
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id='email' type="text"
                      onChange={(e) => {
                        setRowStateData((prev:rowStateDataType) => ({
                          ...prev,
                          email: e.target.value
                        }))
                      }}                      
                      value={rowStateData?.email} />
                    </div>

                  </div>

                  <Button variant={'primary'} className="w-full mt-2" onClick={editValues}>Edit</Button>
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
              {userData?.map((user: User, index: number) => (
                <TableItem key={index} user={user} users={users} index={index} setUserData={setUserData}
                  setOpenModal={setOpenModal}
                  setRowStateData={setRowStateData}
                  setRowStateIndex={setRowStateIndex}
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
