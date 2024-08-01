
'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'

type Props = {
    children: React.ReactNode
}

export default function ChildrenComponent2({
    children
}: Props) {
    // login olmuş mu 

    // admin mi 

    // user mi
    return (
        <>
            <Card className='m-5'>
                <CardHeader>
                    Kullanıcı Adres Bilgileri
                </CardHeader>
                <CardContent>
                    {children}
                </CardContent>
            </Card>
            
        </>
    )
}