'use client';
import { User } from '@prisma/client';
import React, { useState } from 'react'
import Item from './egzersiz-item';



type Props = {
    data: {
        id: string;
        name: string;
        surname: string;
        email: string;
        age: number;
        password: string;
    }[] | undefined
}

export default function TestCase({ data }: Props) {
    const [showId, setShowId] = useState<string | null>(null)

    const onClick = (id: string) => {
        alert(id + ' numaralı idye tıklanıldı')
    }

    return (
        <>
            <ul>
                {
                    data?.map((item: User) => {
                        return (
                            <Item key={item.id} item={item} onClick={onClick} showId={showId} setShowId={setShowId} />
                        )
                    }

                    )
                }

            </ul>
            --- {showId}
        </>

    )
}