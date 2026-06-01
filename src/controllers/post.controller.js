const { Post, Post_Images } = require("../db/models");
const path = require('path');
const fs = require('fs').promises;

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

        if (images.length > 0) {
            await Promise.all(images.map(img => {
                const path_url = `/media/${img.filename}`;
                return Post_Images.create({ url_image: path_url, id_post: postCreado.id });
            }));
        }
        
        if (Array.isArray(tags) && tags.length > 0) {
            await postCreado.addTags(tags)
        }
        
    
        const resultado = await Post.findByPk(postCreado.id, { include : ['images' , 'comments', 'tags']});

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
        const images = await Post_Images.findAll({ where: { id_post } });
        await Promise.all(images.map(img => { 
            const filepath = path.join(__dirname, '../../media', path.basename(img.url_image));
            return fs.unlink(filepath)
        }   
        ));
        const deletePostImage =  await Post_Images.destroy({ where: { id_post } });
        const deletePost = await Post.destroy({ where: { id: id_post } });
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