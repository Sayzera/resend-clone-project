import { onGetUserList } from '@/actions/user'
import UserList from '@/components/users/list'
import React from 'react'

type Props = {}

export default async function UserListPage({}: Props) {
  const users = await onGetUserList();

  return (
    <div className='p-5'>
        <UserList users={users?.data} />
    </div>
  )
}