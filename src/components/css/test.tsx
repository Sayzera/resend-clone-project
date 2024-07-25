'use client';
import React, { useEffect, useState } from 'react'
import styles from './index.module.css'

type Props = {}

export default function Test2({ }: Props) {
  const [sehirId, setSehirId] = useState<number>(0)

  useEffect(() => {
    if(sehirId !=0) {
      console.log('Ankaranın ilçeleri')
    }
  }, [sehirId])


  
    return (
      <div>
        <div onClick={() => setSehirId(6)}>
            1
        </div>

        <div>
           2
        </div>

        <div>
          3
        </div>

        <div>
          3
        </div>
        
      </div>
    )
}


