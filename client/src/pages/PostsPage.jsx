import React, { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { PostItem } from '../components/PostItem';
export const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  const fetchMyPosts = async () => {
    try {
      const { data } = await axios.get('/posts/user/me');
      console.log(data)
      setPosts(data)
    } catch (error) {
    }
  }

  useEffect(() => {
    fetchMyPosts()
  }, [])

  if(!posts){
    return (
      <div className='text-xl text-center text-white py-10'>
        Загрузка...
      </div>
    )
  }
  return (
    <div className='w-1/2 mx-auto py-10 flex flex-col gap-10'>
      {posts.length !== 0 && posts?.map((post, idx) => {
          if (post !== null) {
            return (<PostItem post={post} key={idx} />)
          }
        }).reverse()}
    </div>
  )
}
