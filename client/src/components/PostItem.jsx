import React, { useState } from 'react'
import Moment from 'react-moment'
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'
import { Link } from 'react-router-dom'

export const PostItem = ({post}) => {
  return (
    <Link className='' to={`/${post._id}`}>
    <div className='flex duration-200 bg-gray-900/25 p-5 flex-col basis-1/4 flex-grow rounded-xl hover:bg-gray-900/40'>
        <div className={
            post.imgUrl ? 'flex rounded-xl  overflow-hidden h-80' : 'flex rounded-xl'
        }>
            {post.imgUrl && (
                      <img src={'http://localhost:3002/' + post.imgUrl} alt="img" className='object-cover w-full'/>
            )}
        </div>
        <div className='flex justify-between items-center pt-2'>
            <div className='text-xs text-white opacity-50'>{post.username}</div>
            <div className='text-xs text-white opacity-50'>
                  <Moment date={post.createdAt} format='HH:mm  DD MMM YYYY' />
            </div>
        </div>
        <div className='text-white text-xl'>
            {post.title}
        </div>
        <p className='text-white opacity-60 text-xs pt-4'>{post.text}</p>
        <div className='flex mt-2 gap-3 items-center'>
            <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                <AiFillEye /> <span>{post.views}</span>
            </button>
            <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                <AiOutlineMessage /> <span>{post.comments?.length}</span>
            </button>
        </div>
    </div>
    </Link>
  )
}
