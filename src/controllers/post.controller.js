const { Post, Post_Images } = require("../db/models");

const createPost = async (req, res) => {
    try {
        const { texto, tags } = req.body
        const id_user = req.params.id
        const images = req.files || [] 
        const postCreado = await Post.create({
            texto, 
            fechaPublicacion: new Date(),
            id_user
        });

        for (const img of images) { 
            await Post_Images.create({ url_image: img.filename, id_post: postCreado.id });
        }
        
        await postCreado.addTags(tags)
    
        const resultado = await Post.findByPk(postCreado.id, { include : ['images']});

        res.status(201).json(resultado)

    }catch(err)
    {
        res.status(500).json({message: `${err}`});
        return
    }
}

const deletePost = async (req, res) => {
    try{
        const { id_post } = req.params
        const deletePost = await Post.destroy(id_post);
        res.status(200).json({message: `Post eliminado correctamente`}); 
        return 
    }catch(err)
    {
        res.status(500).json({message: `${err}`});
        return
    }
}

const getPosts = async (_, res) => {
    try {
        const posts = await Post.findAll({ include : ['images', 'comments', 'tags']});
        res.status(200).json(posts);
        return
    }catch(err)
    {
        res.status(500).json({message: `${err}`});
        return
    } 
}

const getAllPostsByUser = async (req, res) => {
    try {
        const id = req.params.id;
        const posts = await Post.findAll({ where : {id_user : id}, include : ['images', 'comments', 'tags']});
        res.status(200).json(posts);
        return
    }catch(err)
    {
        res.status(500).json({message: `${err}`});
        return
    }   
}

const getOnePostByUser= async (req, res) => {
    try {
        const id = req.params.id;
        const id_post = req.params.id_post;
        const post = await Post.findOne({ where : {id_user : id, id: id_post}, include : ['images', 'comments', 'tags']});
        res.status(200).json(post);
        return
    }catch(err)
    {
        res.status(500).json({message: `${err}`});
        return
    }
}

const updatePostByUser = async (req ,res ) =>{
    try{
        const id = req.params.id;
        const id_post = req.params.id_post;
        const { texto } = req.body;
        const post = await Post.findOne({ where : {id_user : id, id: id_post}});
        await post.update({ texto });
        res.status(200).json(post);
        return
    }catch(err)
    {
        res.status(500).json({message: `${err}`});
        return  
    }
}

module.exports = {
    createPost,
    deletePost,
    getPosts,
    getAllPostsByUser,
    getOnePostByUser,
    updatePostByUser
}