import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeComment } from '../redux/features/auth/commentSlice'
import {  AiFillDelete } from 'react-icons/ai'
import Moment from 'react-moment'

export const CommentItem = ({ cmt, postId }) => {
    const [hidden, setHidden] = useState(false);

    const avatar = cmt.username.trim().toUpperCase().split('').slice(0, 2)
    const dispatch = useDispatch();
    console.log(cmt)

    const handleOnDelete = () => {
        setHidden(true);
        dispatch(removeComment({ commentId: cmt._id, postId }))
    }
    if(hidden){
        return (<></>);
    }

    return (
        <div className='flex w-full gap-3 p-[5px]'>
            <div className='flex items-center justify-center shrink-0 rounded-full mt-[10px] w-10 h-10 bg-blue-500 text-sm'>
                {avatar}
            </div>
            <div className='flex w-full flex-col text-gray-300'>
                <div className='flex w-full flex-row gap-4 justify-between'>
                    <div className='text-[13px] font-bold py-1 text-blue-300'>
                        {cmt.username}
                    </div>
                    <div className='flex items-center gap-2 text-[12px] py-1 text-gray-300/90'>
                        <AiFillDelete onClick={() => handleOnDelete()} className='cursor-pointer hover:text-red-400'/>

                        <Moment date={cmt.createdAt} format='HH:mm  DD.MM.YY' />
                    </div>
                </div>
               
                <div className='flex text-gray-300 text-[14px]'>{cmt.comment}</div>
            </div>
        </div>
    )
}