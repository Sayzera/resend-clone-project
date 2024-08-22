'use server'

import { getSession } from '@/actions/auth/session-action'
import React from 'react'
import { redirect } from 'next/navigation';
import SignOutButton from './sign-out-button';

type Props = {}

export default async function Home({}: Props) {
  const session = await getSession();
  // if(!session.isLoggedIn) {
  //   redirect('/users/register')
  // }
 
  return (
    <SignOutButton />
  )
}
