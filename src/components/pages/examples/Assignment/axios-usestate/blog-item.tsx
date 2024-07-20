import React from 'react'

type Props = {
    title:string
    body:string
}

function BlogItem({ 
    title,
    body
}: Props) {
    return (
        <div className='border shadow-md p-4'>
            <div className='font-bold'>{title}</div>
            <div className='text-zinc-600'>{body}</div>
        </div>
    )
}

export default BlogItem