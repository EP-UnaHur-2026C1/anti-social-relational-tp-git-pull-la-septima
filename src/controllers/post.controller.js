const { Post, Post_Images } = require("../db/models");

const createPost = async (req, res) => {
    try {
        const { texto, images } = req.body
        const id_user = req.params.id_user
        const postCreado = await Post.create({
            texto, 
            fechaPublicacion: new Date(),
            id_user
        });

        for (const img of images) { 
            const url = img.url_image;
            await Post_Images.create({ url_image: url, id_post: postCreado.id });
        }
      
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
        const { id } = req.params
        const post = await Post.findByPk(id);
        const deletePost = await Post.destroy({where : {id}});
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
        const posts = await Post.findAll({ include : ['images']});
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
        const posts = await Post.findAll({ where : {id_user : id}, include : ['images']});
        res.status(200).json(posts);
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
    getAllPostsByUser
}