'use client'


import React, { useEffect, useState } from 'react'



function SettingForm() {
  const [name, setName] =useState('Sezer')

  useEffect(() => {
    setName('Arda')

  }, [])
  return (
    <div>SettingForm {name}</div>
  )
}


export function SettingForm2(){
  return (
    <div>SettingForm2</div> 
  )
}

export const SettingForm3  = () =>{
  return (
    <div>SettingForm2</div> 
  )
}

export const names =  [
  'Sezer',
  'Arda'
]


export default SettingForm