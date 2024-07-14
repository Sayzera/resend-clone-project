
'use client'
import Image from 'next/image'
import React from 'react'
import LogoImage from '@/image/logo/logo.svg'

type Props = {}

export default function Logo({ }: Props) {
  return (
    <div className="h-[60px]">
      <Image
        src={LogoImage}
        alt="logo"
        width={0}
        height={0}
      />
    </div>
  )
}