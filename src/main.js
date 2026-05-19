const express = require('express');
const app = express();
const {sequelize} = require('./db/models')
const dotenv = require('dotenv');
const userRouter = require('./routes/user.routes');
const postRouter = require('./routes/post.routes');
const tagRouter = require('./routes/tag.routes');
const postImagesRouter = require('./routes/post_images.routes');
const { FORCE } = require('sequelize/lib/index-hints');
dotenv.config()
const PORT = process.env.PORT || 3001

app.use(express.json())

app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/tags', tagRouter)
app.use('/post_images', postImagesRouter)

app.listen(PORT, async (err)=> {
    if(err) {
        console.error(err.message)
        process.exit(1)
    }
    await sequelize.sync({alter: true})
    console.log(`App iniciada en el puerto ${PORT}`)
})