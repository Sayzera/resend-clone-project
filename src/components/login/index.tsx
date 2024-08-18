"use client"

import { client } from "@/lib/prisma";
import { Login } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
    const [formData,setFormData] = useState<
    {
        email?: string
        password?: string
    } >({})

    const [errorMessage, setErrorMessage] = useState<boolean>(true);

    // function findUser async () => {

    //   const existingUser = await client.user.findUnique({
    //     where: {
    //       email: formData?.email,
    //   }

    //   return existingUser;

    // }
    

    // WIP: validation yapılacak. 

    const onHandleLogin = async () => {
      const emailIsValid = /^([a-zA-Z0-9])+@(gmail|hotmail)\.com$/.test(
        formData?.email || '' // sor
      );

      const passwordIsValid =
        formData.password && formData?.password.length >5 && formData?.password.length < 16;
    
      if (
        formData.email &&
        formData.password &&
        formData.email.length > 0 &&
        formData.email.length < 200 &&
        emailIsValid &&
        passwordIsValid
      ) {
        setErrorMessage(false);
        let result = await Login(formData);

        if(result?.status === 200) {
          router.push('/')
        }
      } else {
        setErrorMessage(true);
      }
      console.log(errorMessage);
      
    };



  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">
            Login
        </CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
  
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" onChange={
            (e) => {
                setFormData((prev) => ({
                    ...prev,
                    email: e.target.value
                }))
            }
          } placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" onChange={
            (e) => {
                setFormData((prev) => ({
                    ...prev,
                    password: e.target.value
                }))
            }
          } />
        </div>
        <div className="text-red-600">
          {errorMessage ? 'Login failed. Please check your account details.' : ''}
          </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onHandleLogin}>Login</Button>
      </CardFooter>
    </Card>
  )
}