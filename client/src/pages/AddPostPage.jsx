import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createPost } from '../redux/features/auth/postSlice';

export const AddPostPage = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [textContent, setTextContent] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOnAddImage = (event) => {
    const imagesArr = [...images, event.target.files[0]];
    setImages(imagesArr);
  }

  const handleOnDeleteImages = () => {
    setImages([]);
  }

  const handleOnDeleteImage = (imgItem) => {
    const imagesArr = images.filter((_, index) => {
      return index !== imgItem; 
    })
    setImages(imagesArr);  
  }

  const handleOnSubmit = () => {
    try {
      const data = new FormData()
      data.append('title', title);
      data.append('text', textContent);
      if (images.length) {
        data.append('image', images[0])
      }
      else {
        data.append('image', '');
      }
      dispatch(createPost(data));
      handleOnClearInputs();
      navigate('/');
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnClearInputs = () => {
    setImages([]);
    setTitle('');
    setTextContent('');
  }

  return (
    <form className='w-1/3 mx-auto py-10 portrait:w-[80%] portrait:max-w-[800px]' onSubmit={(e) => e.preventDefault()}>
      <label className='text-gray-300 duration-200 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer hover:bg-gray-800'>
        Прикрепить изображение:
        <input onChange={(event) => handleOnAddImage(event)} type='file' className='hidden'></input>
      </label>
      <div className='flex w-auto object-cover py-2'>
        {images.length > 0 && 
          images.map((image, index) => {
            return (
              <div onClick={() => handleOnDeleteImage(index)} className='mr-[4px] bg-red-600 cursor-pointer' key={index}>
                <img className='w-12 h-12 duration-200 block p-[2px]  bg-slate-600 hover:bg-red-600 hover:opacity-25' src={window.URL.createObjectURL(image)} alt={'image' + index}/>
              </div>
            )
          }
        )
        }
      </div>
      <div className='flex w-auto object-cover pb-2 justify-between '>
        {images.length > 0 &&
          <div onClick={() => handleOnDeleteImages()} className='mr-[4px] cursor-pointer'>
            <p className='duration-200 text-red-600 text-xs hover:text-red-400'>Очистить все</p>
          </div>
        }
        {images.length > 1 && (
          <p className='text-xs text-green-500 m-0 p-0 text-center '>Slider with images</p>
        )}
      </div>
      

      <label className='text-xs text-white opacity-70'>
        Заголовок поста:
        <input 
          onChange={(event) => setTitle(event.target.value)}
          value={title}
          type='text' 
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray'
          placeholder='Заголовок'
        ></input>
      </label>
      <label className='text-xs text-white opacity-70'>
        Текст поста
        <textarea
          onChange={(event) => setTextContent(event.target.value)}
          value={textContent}
          type='text'
          className='mt-1 resize-none text-black w-full rounded-lg bg-gray-400 border py-1 px-2 h-40 text-xs outline-none placeholder:text-gray'
          placeholder='Текст'
        ></textarea>
      </label>

      <div className='flex gap-8 items-center justify-center mt-4'>
        <button onClick={() => handleOnSubmit()} className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'>
          Добавить
        </button>
          <button onClick={handleOnClearInputs} className='flex justify-center items-center bg-red-700 text-xs text-white rounded-sm py-2 px-4'>
            Отменить
          </button>
      </div>
    </form>
  )
}
