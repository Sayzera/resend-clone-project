'use server'
import { getSession } from '@/actions/auth/session-action'
import React from 'react'

import { redirect } from 'next/navigation';

type Props = {}

export default async function Home({}: Props) {
  const session = await getSession();
  if(!session.isLoggedIn) {
    redirect('/login')
  }
 
  return (
    <div className='p-5'>Home</div>
  )
}
