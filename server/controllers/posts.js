import Post from '../models/Post.js';
import User from '../models/User.js';
import Comment from '../models/Comment.js';
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';

// Create Post

export const createPost = async (req, res) => {
    try{
        const {title, text} = req.body;
        const user = await User.findById(req.userId);
        if(req.files) {
            let fileName = Date.now().toString() + req.files.image.name;
            const __dirname = dirname(fileURLToPath(import.meta.url));
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));
            const newPostWithImage = new Post({
                username: user.username,
                title,
                text,
                imgUrl: fileName,
                author: req.userId,
            })

            await newPostWithImage.save();
            await User.findByIdAndUpdate(req.userId, {
                $push: { posts: newPostWithImage },
            });
            return res.json(newPostWithImage);
        }

        const newPostWithoutImage = new Post({
            username: user.username,
            title,
            text,
            imgUrl: '',
            author: req.userId,
        })
        await newPostWithoutImage.save();
        await User.findByIdAndUpdate(req.userId, {
                $push: { posts: newPostWithoutImage },
            });
        return res.json(newPostWithoutImage);

    } catch (error) {
        res.json({ message: 'Ошибка при создании поста' })
    }
}

//Get all posts
export const getAll = async (req, res) => {
    try {
        const posts = await Post.find().sort('-createdAt');
        const popularPosts = await Post.find().limit(5).sort('-views');
        if (!posts) {
            return res.json({ message: 'Нет постов' })
        }
        res.json({posts, popularPosts})
    } catch(error) {
        res.json({ message: 'Ошибка при получении постов' })
    }
}

//Get post by id
export const getById = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $inc: {views: 1},
        });
        res.json(post);
    } catch(error) {
        res.json({message: 'Ошибка при получении поста'})
    }
}

// Get All Posts
export const getMyPosts = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        const list = await Promise.all(
            user.posts.map((post) => {
                return Post.findById(post._id)
            }),
        )

        res.json(list)
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

// remove post
export const removePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if(!post) return res.json({message: 'Такого поста не существует'})

        await User.findByIdAndUpdate(req.userId, {
            $pull: { posts: req.params.id }
        })

        res.json({message: 'Пост был удален.'})
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

// update post
export const updatePost = async (req, res) => {
    try {
        const { title, text, id } = req.body
        const post = await Post.findById(id)

        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
            post.imgUrl = fileName || ''
        }

        post.title = title
        post.text = text

        await post.save()

        res.json(post)
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

// Get Post Comments
export const getPostComments = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        const list = await Promise.all(
            post.comments.map((comment) => {
                return Comment.findById(comment)
            }),
        )
        res.json(list)
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

export const removeComment = async (req, res) => {
  const {postId, commentId} = req.body; // Идентификатор поста
  try {
    // Найти пост по идентификатору и проверить его наличие

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Проверить, существует ли комментарий в посте
    const commentExists = post.comments.includes(commentId);
    if (!commentExists) {
      return res.status(404).json({ error: 'Comment not found in post' });
    }

    // Удалить комментарий из поста
    await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });

    // Удалить сам комментарий из коллекции комментариев
    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Failed to remove comment:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}