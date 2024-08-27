import { getSession } from '@/actions/auth/session-action';
import UserRegister from '@/components/auth/register'
import React from 'react'

type Props = {}

export default async function ResgisterPage({}: Props) {
  const session = await getSession();

  return (
    <div>
        <UserRegister session={session} />
    </div>
  )
}