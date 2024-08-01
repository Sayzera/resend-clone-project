
'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'
import ChildrenComponent2 from './children-component-2'

type Props = {
    children: React.ReactNode
}

export default function ChildrenComponent1({
    children
}: Props) {
    // login olmuş mu 

    // admin mi 

    // user mi
    return (
        <>
            <Card className='m-5'>
                <CardHeader>
                    Kullanıcı Bilgileri
                </CardHeader>
                <CardContent>
                    {children}
                </CardContent>
            </Card>


            <ChildrenComponent2>
                test adress
            </ChildrenComponent2>

        </>
    )
}