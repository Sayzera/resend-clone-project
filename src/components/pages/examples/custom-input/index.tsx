import Input from '@/components/form/elements/input'
import React from 'react'

type Props = {}

export default function CustomInput({ }: Props) {
    return (
        <div className='p-5'>
            <Input label='Name' />
            <Input label='Lastname' />
            <Input label='Age' type='number' error={`Girilen değer 18 den büyük olmak zorundadır`} />
            <Input label='Birthday' type='date' />
            <Input label='Profile Picture' type='file' />
            <Input label='Email' type='email' />
            <Input label='Password' type='password' />

        </div>
    )
}

