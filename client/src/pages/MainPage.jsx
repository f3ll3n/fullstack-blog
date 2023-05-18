import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PopularPosts } from '../components/PopularPosts'
import { PostItem } from '../components/PostItem'
import { getAllPosts } from '../redux/features/auth/postSlice'

export const MainPage = () => {
  const dispatch = useDispatch();
  const { posts, popularPosts } = useSelector((state) => state.post)
  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  return (
    <div className='max-w-[900px] mx-auto py-10'>
      <div className="flex justify-between gap-8 portrait:flex-col-reverse">
        <div className="flex flex-col gap-3 basis-4/5">
          {posts?.map((post, index) => {
            return <PostItem key={index} post={post}/>
          })
          }
        </div>
        <div className='basis-1/5 portrait:p-2 portrait:text-center'>
          <div className="text-xs text-white opacity-60 portrait:p-2">
            Popular posts
          </div>
          {popularPosts?.map((post, index) => {
            return <PopularPosts key={index} post={post}/>
          })
          }
        </div>
      </div>
    </div>
  )
}
