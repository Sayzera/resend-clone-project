"use client"

import { login } from "@/actions/auth"
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

export function LoginForm() {
    const [formData,setFormData] = useState<
    {
        email?: string
        password?: string
    } >({})


    // WIP: validation yapılacak. 

    const onHandleLogin = async () => {
        if(formData?.email && formData?.password) {
            await login(formData);
        }
    }



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
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onHandleLogin}>Login</Button>
      </CardFooter>
    </Card>
  )
}