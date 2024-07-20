'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BlogItem from './blog-item';

type Props = {}

export default function Blogs({ }: Props) {

  const [blogs, setBlogs] = useState<
    {
      userId: number
      id: number
      title: string
      body: string
    }[]
  >([])

  useEffect(() => {
    getAllData();
  }, [])

  async function getAllData() {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const first10 = data;
    setBlogs(first10);

  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 md:gap-3 max-h-[500px] overflow-y-auto border p-5'>


      {
        blogs?.map((item) => (
          <BlogItem
            key={item.id}
            title={item.title}
            body={item.body}
          />
        )

        )
      }

    </div>
  )
}