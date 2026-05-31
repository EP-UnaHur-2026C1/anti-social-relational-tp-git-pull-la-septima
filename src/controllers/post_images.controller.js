const { Post, Post_Images } = require("../db/models");
const path = require('path');
const fs = require('fs').promises;

const createPostImage = async (req, res) => {
    try {
        const file = req.files 
        const { id_post } = req.params
        const path_url = `/media/${file.filename}`
        const image = await Post_Images.create({
            url_image: path_url,
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
        const { id_post, id_pi } = req.params
        const image = await Post_Images.findOne({ where: { id: id_pi, id_post } });
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
        const { id_post, id_pi } = req.params;
        const file = req.files;
        const image = await Post_Images.findOne({ where : {id : id_pi, id_post}});
        const urldel = path.join(__dirname, '..', '..', image.url_image);
        await fs.unlink(urldel);
        const newImagen = `/media/${file.filename}`;
        await image.update({ url_image: newImagen });
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
        const { id_post, id_pi } = req.params;
        const image = await Post_Images.findOne({where : {id : id_pi, id_post}});
        const urldel = path.join(__dirname, '..', '..', image.url_image);       
        await fs.unlink(urldel);
        await Post_Images.destroy({ where: { id : id_pi } });
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