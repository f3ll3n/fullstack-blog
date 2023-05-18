import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, loginUser } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';


export const LoginPage = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth)
  const isAuth = useSelector(checkIsAuth);
  const navigate = useNavigate();
  
  useEffect(() => {
    if(status) {
      toast(status)
    }
    if(isAuth){
      navigate('/');
    }
  }, [status, navigate, isAuth])

  const handleSubmit = () => {
    try {
      dispatch(loginUser({ username, password }));
      setPassword('');
      setUserName('');
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
        <form onSubmit={e => e.preventDefault()} 
          className='min-w-[320px] w-1/2 h-60 mx-auto mt-40 lg:w-1/4 md:w-1/2 sm:w-1/2'
        >
            <h1 className='text-lg text-white text-center'>Авторизация</h1>
            <label className='text-xs text-gray-400'>
                Username:
                <input type='text' 
                value={username}
                onChange={e => setUserName(e.target.value)}
                placeholder='Username' 
                className='mt-1  w-full rounded-lg bg-gray-400/10 border py-2 px-2 text-xs outline-none text-white placeholder:text-gray-400' 
                />
            </label>
            <label className='text-xs text-gray-400 block py-3'>
                Password:
                <input type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder='password'
                    className='mt-1  w-full rounded-lg bg-gray-400/10 border py-2 px-2 text-xs outline-none text-white placeholder:text-gray-400'
                />
          </label>
          <div className='flex gap-8 justify-center mt-4'>
          <button onClick={handleSubmit} type='submit' className='flex duration-200 justify-center bg-gray-600/50 border border-gray-400/20 items-center text-xs text-white rounded-sm py-1 px-4 hover:border-gray-400 hover:bg-gray-400'>Войти</button>
            <Link to='/register'
                className='flex justify-center items-center text-xs text-white'
            >
                Нет аккаунта?
            </Link>
          </div>

        </form>
    )
}
