import React from 'react'

type Props = {
    message: string
}

function ErrorMessage({message}: Props) {

  return (
    <div className="text-red-500 font-bold">{message}</div>
  )
}

export default ErrorMessage