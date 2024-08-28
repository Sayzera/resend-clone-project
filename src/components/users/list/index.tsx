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
import { User } from "@prisma/client"
import { onEditUser, onGetUserList } from "@/actions/user"
import { useToast } from "@/components/ui/use-toast"
import { getSession } from "@/actions/auth/session-action"
import { SessionData } from "@/lib/session"

type Props = {
  users: {
    id: string
    name: string
    surname: string
    email: string
    age: number
    password: string
  }[] | undefined
}

type rowStateDataType =
  null |
  {
    id?: string
    name?: string
    surname?: string
    age?: string
    email?: string
    password?: string
  }

export default function UserList({ users }: Props) {
  const [mounted, setMounted] = useState<boolean>(false);
  // database den gelen veri
  const [userData, setUserData] = useState<User[] | undefined>(users);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [rowStateData, setRowStateData] = useState<rowStateDataType | null>(null);
  const [rowStateIndex, setRowStateIndex] = useState<number | null | string>(null);
  const { toast } = useToast();
  const [session, setSession] = useState<SessionData | null>(null);

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionData = await getSession();
        setSession(sessionData);
      } catch (error) {
        console.error('Failed to fetch session:', error);
      }
    };
    fetchSession();
  }, [session]);

  if (!mounted) return

  const editValues = async () => {
    if (rowStateData) {
      try {
        const result = await onEditUser(rowStateData);

        if (result?.status === 200) {
          const editingUsers = await onGetUserList();
          setUserData(editingUsers?.data);
          //console.log('ok');

          toast({
            title: "Başarılı",
            description: result?.message,
          });

        } else {
          toast({
            title: "Hata!",
            description: result?.message,
          });
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "Hata",
          description: 'Bir hata olustu',
        });
      } finally {
        setOpenModal(false);
      }
    }
  };

  return (
    <div>
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
                          setRowStateData((prev: rowStateDataType) => ({
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
                          setRowStateData((prev: rowStateDataType) => ({
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
                          setRowStateData((prev: rowStateDataType) => ({
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
                          setRowStateData((prev: rowStateDataType) => ({
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
                <TableHead className="w-[100px]">Surname</TableHead>
                <TableHead className="w-[100px]">Age</TableHead>
                <TableHead className="w-[150px]">Email</TableHead>
                <TableHead className="w-[150px]">Password</TableHead>
                <TableHead className="w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userData?.map((user: User, index: number) => (
                <TableItem key={index}
                  user={user}
                  users={users}
                  index={index}
                  setUserData={setUserData}
                  setOpenModal={setOpenModal}
                  setRowStateData={setRowStateData}
                  setRowStateIndex={setRowStateIndex}
                  session={session}
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

