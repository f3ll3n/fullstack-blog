import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import authRoute from './routes/auth.js';
import postRoute from './routes/posts.js'
import commentRoute from './routes/comments.js'
import Comment from './models/Comment.js';
import Post from './models/Post.js';

const app = express();

//Constants
dotenv.config()

const PORT = process.env.PORT || 3001
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

//Middleware
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static('uploads'));
//Routes
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute)
async function start() {
    try {
        await mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.tyvt8tq.mongodb.net/${DB_NAME}`
        )

        app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
    } catch (error) {
        console.log(error)
    }
}
start()



// Post.deleteOne({ comment: { $exists: false, $eq: null,} }, { comment: ''}, { comment: null},)
//   .then(result => {
//     console.log('Deleted:', result.deletedCount, 'comments');
//     // Дополнительный код, который выполнится после удаления комментариев
//   })
//   .catch(error => console.error('Failed to delete comments:', error));