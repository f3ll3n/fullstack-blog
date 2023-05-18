import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { createPost, getAll, getById, getMyPosts, removePost, updatePost, getPostComments, removeComment } from '../controllers/posts.js';


const router = new Router();

//Register
router.post('/', checkAuth, createPost);

//Get all posts
router.get('/', getAll);

//Get post by id
router.get('/:id', getById);

//Get all my posts
router.get('/user/me', checkAuth, getMyPosts)

//Remove post
router.delete('/:id', checkAuth, removePost)

//Update Post
router.put('/:id', checkAuth, updatePost);

// http://localhost:3002/api/posts/comments/:id
router.get('/comments/:id', getPostComments)

router.delete('/:id/comments/:id/', checkAuth, removeComment)

export default router