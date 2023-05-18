import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai';

export const PopularPosts = ({post}) => {
  return (
    <Link to={`/${post._id}`}>
          <div className='bg-gray-600 my-1 portrait:rounded-md'>
            <div className='flex gap-2 justify-between cursor-pointer duration-100 text-xs text-gray-300 hover:bg-gray-800 hover:text-white p-2'>
                <div>
                      {post.title}
                </div>
                  <div className='portrait:flex flex-row gap-3'>
                      <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                          <AiFillEye /> <span>{post.views}</span>
                      </button>
                      <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                          <AiOutlineMessage /> <span>{post.comments.length}</span>
                      </button>
                </div>
            </div>
        </div>
    </Link>
  )
}
