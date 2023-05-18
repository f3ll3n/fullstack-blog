import React, { useCallback, useEffect, useState } from 'react'
import Moment from 'react-moment'
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete } from 'react-icons/ai'
import axios from '../utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { removePost } from '../redux/features/auth/postSlice';
import { toast } from 'react-toastify';
import { createComment, getPostComments } from '../redux/features/auth/commentSlice';
import { CommentItem } from '../components/CommentItem';
export const PostPage = () => {
  const [comment, setComment] = useState('');
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const fetchPost = useCallback(async() => {
    const {data} = await axios.get(`/posts/${params.id}`);
    setPost(data)
  }, [params.id])

  const { comments } = useSelector((state) => state.comment)

  const removePostHandler = () => {
    try {
      dispatch(removePost(params.id))
      toast('Пост был удален');
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = () => {
    try {
      const postId = params.id
      dispatch(createComment({ postId, comment }))
      setComment('')
    } catch (error) {
      console.log(error)
    }
  }

  const fetchComments = useCallback(async () => {
    try {
      dispatch(getPostComments(params.id))
    } catch (error) {
      console.log(error)
    }
  }, [params.id, dispatch])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  useEffect(() => {
      fetchComments()
      console.log(comments)
  }, [fetchComments, params.id])
  if(!post){
    return(
      <div>
        Поста не существует
      </div>
    )
  }
  return (
    <div className='portrait:m-1'>
      <Link to={'/'}>
        <button className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'>
          Назад 
        </button>
      </Link>
      <div className='flex gap-5 py-8 portrait:flex-col'>
        <div className='w-3/4 portrait:w-full'>
          <div className='flex flex-col flex-grow-0'>
            <div className={post?.imgUrl ? 'flex rounded-sm max-h-[500px] bg-gray-800/50' : 'flex rounded-sm '}>
              {post?.imgUrl && (
                <img src={`http://localhost:3002/${post.imgUrl}`} alt="img" className='object-contain w-full' />
              )}
            </div>
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
          <div className='flex mt-2 gap-3 items-center justify-between'>
            <div className='flex gap-3 mt-4'>
              <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                <AiFillEye /> <span>{post.views}</span>
              </button>
              <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                <AiOutlineMessage /> <span>{post.comments?.length}</span>
              </button>
            </div>
            {
              user?._id === post.author && (
                <div className='flex gap-3 mt-4'>
                  <Link to={`/${params.id}/edit`}>
                    <button className='flex items-center justify-center gap-2 text-md text-white opacity-50'>
                      <AiTwotoneEdit />
                    </button>
                  </Link>

                  <button onClick={() => removePostHandler()} className='flex items-center justify-center gap-2 text-md text-white opacity-50'>
                    <AiFillDelete /> 
                  </button>
                </div>
              )
            }
          </div>
        </div>
        <div className='portrait:w-full w-1/3 text-gray-300/50 portrait:p-2  rounded-xl p-2 bg-gray-900/25'>
          
          <form className='flex gap-2 pb-2' onSubmit={(e) => e.preventDefault()}>
            <input 
              type='text'
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder='Comment'
              className='text-black w-full rounded-sm bg-gray-400 p-2 border text-xs outline-none placeholder:text-gray-700'
            />
            <button onClick={() => handleSubmit()} className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4' type='submit'>
              Отправить
            </button>
          </form>
          <div>
            {comments?.map((cmt) => {
              if(cmt !== null) {
                return (
                <CommentItem key={cmt._id} postId={post._id} cmt={cmt} />
                )
              }
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
