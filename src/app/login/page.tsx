import { LoginForm } from '@/components/login'
import React from 'react'

type Props = {}

export default function PageLogin({}: Props) {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div  className='
        w-[400px]
        ' >
         <LoginForm />
        </div>
    </div>
  )
}