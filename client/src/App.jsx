import { Routes, Route } from 'react-router-dom';
import { Layout } from "./components/Layout";
import {
         MainPage,
         PostsPage,
         PostPage, 
         AddPostPage, 
         RegisterPage, 
         LoginPage, 
         EditPostPage 
        } from "./pages";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { getMe } from './redux/features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])
  return (
      <Layout>
        <div className='pt-[60px]'>

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="posts" element={ <PostsPage />} />
          <Route path=":id" element={<PostPage />} />
          <Route path=":id/edit" element={<EditPostPage/>} />
          <Route path="new" element={<AddPostPage/>} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
        </Routes>
       <ToastContainer position='bottom-right' />
        </div>

       </Layout>
    );
}

export default App;
