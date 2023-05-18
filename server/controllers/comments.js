import Comment from '../models/Comment.js'
import User from '../models/User.js'
import Post from '../models/Post.js'

export const createComment = async (req, res) => {
    try {
        const { postId, comment } = req.body
        const author = await User.findById(req.userId);
        if (!comment)
            return res.json({ message: 'Комментарий не может быть пустым' })

        const newComment = new Comment({ comment, username: author.username})
        await newComment.save()

        try {
            await Post.findByIdAndUpdate(postId, {
                $push: { comments: newComment._id },
            })
        } catch (error) {
            console.log(error)
        }

        res.json(newComment)
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

export const removeComment = async (req, res) => {
    try {
        const cmtId = req.body.cmt;
        const postId = req.body.postId;
        console.log(cmtId)
        // const comment = await Comment.findByIdAndDelete(req.params.id);
        // if(!comment) return res.json({message: 'Такого комментария не существует'})

        // await Post.findByIdAndUpdate(req.postId, {
        //     $pull: { comment: req.params.id }
        // })

        res.json({message: 'Комментарий был удален.'})
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}