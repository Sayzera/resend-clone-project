'use client'

import Loader from '@/components/loader'
import CustomInput from '@/components/pages/examples/custom-input'
import React, { useEffect, useState } from 'react'

type Props = {}

export default function Page({ }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false)


  useEffect(() => {
    setIsLoading(true)
    let clearSettimeout = setTimeout(() => {
      setIsLoading(false)
    }, 2000);

    return () => clearTimeout(clearSettimeout)
  }, [])


  return (
    <Loader isLoading={isLoading}>
    <div>home page</div>
    </Loader>
  )
}





