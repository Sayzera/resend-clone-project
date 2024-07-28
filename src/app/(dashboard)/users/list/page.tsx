import UserList from '@/components/users/list'
import React from 'react'

type Props = {}

export default function UserListPage({}: Props) {
  return (
    <div className='p-5'>
        <UserList />
    </div>
  )
}