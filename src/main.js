const express = require('express');
const path = requiere('path');
const app = express();
const {sequelize} = require('./db/models')
const dotenv = require('dotenv');
dotenv.config();

const userRouter = require('./routes/user.routes');
const postRouter = require('./routes/post.routes');
const tagRouter = require('./routes/tag.routes');
const postImagesRouter = require('./routes/post_images.routes');
const commentRouter = require('./routes/comment.routes');
const { setupSwagger } = require('./swagger');
const PORT = process.env.PORT || 3001

app.use(express.json())

app.use('/media', express.static(path.join(__dirname, '../media')));
app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/tags', tagRouter)
app.use('/post_images', postImagesRouter)
app.use('/comments', commentRouter)

setupSwagger(app)

app.listen(PORT, async (err)=> {
    if(err) {
        console.error(err.message)
        process.exit(1)
    }
    try {
        await sequelize.authenticate();
        console.log(`App iniciada en el puerto ${PORT}`);
    }catch(err)
    {
        console.error('No se pudo conectar a la base de datos:', err.message);
        process.exit(1);
    }
    
})