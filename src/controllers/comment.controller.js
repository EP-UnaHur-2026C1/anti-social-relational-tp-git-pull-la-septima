const { where } = require('sequelize');
const { Comment } = require('../db/models');

const createComment = async (req, res) => {
    try {
        const { comentario } = req.body;
        const { id_post , id_user} = req.params;

        const craeteComment = await Comment.create({
            comentario,
            fecha_publicacion : new Date(),
            visible : true,
            id_user,
            id_post
        })

        res.status(201).json({message: "El comentario fue agregado correctamente"});
        return 

    }catch(err){
        res.status(500).json({message: `${err}`});
        return  
    }
}

const getCommentsByPost = async (req, res) => {
    try {
        const id_post = req.params.id_post;
        const comments = await Comment.findAll({ where : {id_post}});
        res.status(200).json(comments);
        return 
    }   
    catch(err){
        res.status(500).json({message: `${err}`});
        return  
    }       
}

const deleteComment = async (req, res) => {
    try {
        const id = req.params.id; 
        const comment = await Comment.findByPk(id);
        const commentDeleted = await comment.destroy({where : {id}});
        res.status(200).json({message: ` El Comentario : ${comment.comentario} eliminado`});
        return 
    }catch(err){
        res.status(500).json({message: `${err}`});
        return  
    }
}   

const updateComment = async (req, res) => {
    try {
        const id = req.params.id;
        const { comentario } = req.body;
        const comment = await Comment.findByPk(id);
        const commentUpdated = await comment.update({comentario}, {where : {id}});
        res.status(200).json({message: ` El Comentario : ${commentUpdated.comentario} actualizado`});
        return 
    }catch(err){
        res.status(500).json({message: `${err}`});
        return  
    }   
} 

module.exports = {
    createComment,
    getCommentsByPost,
    deleteComment,          
    updateComment
}