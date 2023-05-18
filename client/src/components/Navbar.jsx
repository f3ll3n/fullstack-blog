import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { checkIsAuth } from '../redux/features/auth/authSlice';
import { logOut } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';


export const Navbar = () => {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector(state => state.auth.user);
  const activeStyles = {
    color: 'white'
  }

  const logoutHandler = () => {
    dispatch(logOut());
    window.localStorage.removeItem('token');
    toast('Вы вышли из системы');
    navigate('/login')
  }

  return (
    //TODO: HEADER
      <div className='flex py-4 px-10 portrait:px-2 fixed w-[100%] backdrop-blur-sm z-40 bg-gray-700/20 justify-between items-center left-0 top-0'>
        <span className='flex justify-center items-center w-6 h-6 bg-gray-600 text-xs text-white rounded-sm'>
            E
        </span>
        {/* Add flex gap to UL */}
        
        {isAuth && (
              <ul className='flex gap-8'>
                  <li>
                      <NavLink to={'/'} style={({ isActive }) =>
                          isActive ? activeStyles : undefined}
                          className='text-xs text-gray-400 hover:text-white'
                      >
                          Главная
                      </NavLink>
                  </li>
                  <li className='portrait:hidden'>
                      <NavLink to={'/posts'} style={({ isActive }) =>
                          isActive ? activeStyles : undefined}
                          className='text-xs text-gray-400 hover:text-white'
                      >
                          Мои посты
                      </NavLink>
                  </li>
                  <li>
                      <NavLink to={'/new'} style={({ isActive }) =>
                          isActive ? activeStyles : undefined}
                          className='text-xs text-gray-400 hover:text-white'
                      >
                          Добавить пост
                      </NavLink>
                  </li>
                
                  
              </ul>
        )}
         
          <div className='flex justify-between items-center gap-5'>
            {username && (
                  <p className='text-gray-200 text-[14px]'>{username.username}</p>
                )
            }
              <div className='bg-gray-600 text-xs text-white rounded-sm px-4 py-1'>

                  {isAuth ? (
                    <>
                      <button onClick={() => logoutHandler()}>Выйти</button>
                    </>
                  ) :
                      (
                          <Link to={'/login'}>Войти</Link>
                      )}
              </div>
        </div>
        
    </div>
  )
}
