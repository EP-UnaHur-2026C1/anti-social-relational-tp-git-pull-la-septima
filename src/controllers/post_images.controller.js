const { Post, Post_Images } = require("../db/models");

const createPostImage = async (req, res) => {
    try {
        const { url_image } = req.body
        const { id_post } = req.params
        const post = await Post.findByPk(id_post);
        const image = await Post_Images.create({
            url_image,
            id_post
        });
        res.status(201).json(image);
        return
    }catch(err)
    {
        res.status(500).json({message: `${err}`});
        return
    }
}

const getPostImages = async (req, res) => {
    try{
        const { id_post } = req.params;
        const images = await Post_Images.findAll({ where: { id_post } });
        res.status(200).json(images)
        return
    }catch(err)
    {
        res.status(500).json({message: `${err}`});
        return
    }
}

const getPostImageById = async (req, res) => {
    try{
        const { id_post, id } = req.params
        const image = await Post_Images.findOne({ where: { id: id, id_post } });
        res.status(200).json(image)
        return
    }catch(err)
    {
        res.status(500).json({message: `${err}`});
        return
    }
}

const updatePostImage = async (req, res) => {
    try{
        const { id_post, id } = req.params;
        const { url_image } = req.body;
        const image = await Post_Images.findOne({ where : {id : id, id_post}});
        await image.update({ url_image });
        res.status(200).json(image);
        return
    }catch(err)
    {
        res.status(500).json({message: `${err}`});
        return
    }
}

const deletePostImage = async (req, res) => {
    try{
        const { id_post, id } = req.params;
        const image = await Post_Images.findOne({where : {id : id, id_post}});
        await Post_Images.destroy({ where: { id } });
        res.status(200).json({message: `Imagen eliminada correctamente`}); 
        return 
    }catch(err)
    {
        res.status(500).json({message: `${err}`});
        return
    }
}

module.exports = {
    createPostImage,
    getPostImages,
    getPostImageById,
    updatePostImage,
    deletePostImage
}