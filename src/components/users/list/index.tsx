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
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Cookies from 'js-cookie'
import {Helmet} from "react-helmet";
import ErrorMessage from "@/components/auth/register/error-message"

type Props = {}

type userItemType = {
  name: string;
  surname: string;
  age: string;
  email: string;
  password: string;
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

export default function UserList({ }: Props) {
  const users = getRegisterUserFromCookies('users');
  const [mounted, setMounted] = useState<boolean>(false);
  const [userData, setUserData] = useState<userItemType[]>(users);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [rowStateData, setRowStateData] = useState<rowStateDataType | null>(null);
  const [rowStateIndex, setRowStateIndex] = useState<number | null>(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
  const [ageErrorMessage, ageSetErrorMessage] = useState<string>('');
  const [nameErrorMessage, nameSetErrorMessage] = useState<string>('');
  const [surnameErrorMessage, surnameSetErrorMessage] = useState<string>('');
  const [emailErrorMessage, emailSetErrorMessage] = useState<string>('');
  const [duplicateEmailErrorMessage, setDuplicateEmailErrorMessage] = useState<string>('');

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (rowStateData?.name) {
      if (rowStateData.name.length < 2) {
        nameSetErrorMessage('Minimum 2 karakter girmelisiniz');
      } else if (rowStateData.name.length > 50) {
        nameSetErrorMessage('Maksimum 50 karakter girebilirsiniz');
      } else {
        nameSetErrorMessage('');
      }
    } else {
      nameSetErrorMessage('');
    }
  }, [rowStateData?.name]);

  useEffect(() => {
    if (rowStateData?.surname) {
      if (rowStateData.surname.length < 2) {
        surnameSetErrorMessage('Minimum 2 karakter girmelisiniz');
      } else if (rowStateData.surname.length > 50) {
        surnameSetErrorMessage('Maksimum 50 karakter girebilirsiniz');
      } else {
        surnameSetErrorMessage('');
      }
    } else {
      surnameSetErrorMessage('');
    }
  }, [rowStateData?.surname]);

  useEffect(() => {
    if (rowStateData?.age) {
      if (rowStateData.age.length > 0 && Number(rowStateData.age) < 18) {
        ageSetErrorMessage('18 yaşından büyük olmalısınız');
      } else {
        ageSetErrorMessage('');
      }
    }
  }, [rowStateData?.age]);

  useEffect(() => {

    const email = rowStateData?.email || '';

    let result = /^([a-zA-Z]|[0-9])+\@(gmail|hotmail|)\.com$/.test(email)
    if(!result && email.length > 0) {
       emailSetErrorMessage('Hatali')
    } else {
       emailSetErrorMessage('')
    }
    let data = getRegisterUserFromCookies('users');
    if (Array.isArray(data) && data.some((user: any) => user.email === email)) {
       setDuplicateEmailErrorMessage('This email address is already taken by another user.')
    } else {
       setDuplicateEmailErrorMessage('');
    }
  }, [rowStateData?.email]);

  useEffect(() => {
    if (rowStateData?.password) {
      if (rowStateData.password.length > 0 && rowStateData.password.length < 6) {
        setPasswordErrorMessage('Minimum 6 değer girmelisiniz');
      } else if (rowStateData.password.length > 50) {
        setPasswordErrorMessage('Maksimum 16 karakter girebilirsiniz');
      } else {
        setPasswordErrorMessage('');
      }
    }
  }, [rowStateData?.password]);

  if (!mounted) return

  const editValues = () => {
    if (rowStateIndex === null) {
      return;
    }
  
    const updatedUsers = [...users];
    updatedUsers[rowStateIndex] = { ...rowStateData };
  
    setUserData(updatedUsers);
  
    Cookies.set('users', JSON.stringify(updatedUsers));
  }

  const isFormValid = () => {
    return (
      !nameErrorMessage &&
      !surnameErrorMessage &&
      !ageErrorMessage &&
      !emailErrorMessage &&
      !duplicateEmailErrorMessage &&
      !passwordErrorMessage &&
      rowStateData && 
      rowStateData.name && rowStateData.name.length > 0 &&
      rowStateData.surname && rowStateData.surname.length > 0 &&
      rowStateData.age && rowStateData.age.length > 0 &&
      rowStateData.email && rowStateData.email.length > 0 &&
      rowStateData.password && rowStateData.password.length > 0
    );
  };

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
                    <div className="text-red-500 font-bold">
                      {nameErrorMessage}
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
                    <div className="text-red-500 font-bold">
                      {surnameErrorMessage}
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
                    <div className="text-red-500 font-bold">
                      {ageErrorMessage}
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
                    <div className="text-red-500 font-bold">
                      {emailErrorMessage || duplicateEmailErrorMessage}
                    </div>

                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input id='password' type="text" 
                      value={rowStateData?.password}
                      onChange={(e) => {
                        setRowStateData((prev:rowStateDataType) => ({
                          ...prev,
                          password: e.target.value
                        }))
                      }}
                      />
                    </div>
                    <div className="text-red-500 font-bold">
                      {passwordErrorMessage}
                    </div>

                  </div>

                  <Button disabled={!isFormValid()} variant={'primary'} className="w-full mt-2" onClick={editValues}>Edit</Button>
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
              {Array.isArray(userData) && userData.map((user: userItemType, index: number) => (
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
