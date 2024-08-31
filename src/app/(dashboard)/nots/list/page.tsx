import { onGetNoteList } from '@/actions/nots'
import NotsList from '@/components/nots/list';
import React from 'react'

type Props = {}

export default async function NotListPage({}: Props) {
  const notes = await onGetNoteList();

  console.log(notes?.data, 'notes?.data')
  return (
    <div className='p-5'>
      <NotsList notes={notes} />
    </div>
  )
}