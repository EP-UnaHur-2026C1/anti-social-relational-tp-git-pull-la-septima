const { validateId, validateSchema } = require("./generic.middleware");
const { Comment, User, Post } = require("../db/models")
const { commentSchema, updateVisibilitySchema } = require("../schemas/comment.schema")


const validateCommentId = validateId(Comment)

const validateSchemaComment = validateSchema(commentSchema)

const validateSchemaUpdateVisibility = validateSchema(updateVisibilitySchema)

const validateCommentUserId = async(req, res, next) => {
    try{
        const { id_user } = req.params
        if(isNaN(id_user)||parseInt(id_user) <= 0){
            res.status(400).json({message: 'El id debe ser un numero válido'})
            return
        }
        const instance = await User.findByPk(id_user)
        if (!instance){
            res.status(404).json({message: `El id ${id_user} no fue encontrado`})
            return
        }
    }catch(err){
        res.status(500).json(`${err}`)
        return
    }
    next()
}

const validateCommentPostId = async(req, res, next) => {
    try{
        const { id_post } = req.params
        if(isNaN(id_post)||parseInt(id_post) <= 0){
            res.status(400).json({message: 'El id debe ser un numero válido'})
            return
        }
        const instance = await Post.findByPk(id_post)
        if (!instance){
            res.status(404).json({message: `El id ${id_post} no fue encontrado`})
            return
        }
    }catch(err){
        res.status(500).json(`${err}`)
        return
    }
    next()
}

module.exports = {
    validateCommentId,
    validateSchemaComment,
    validateSchemaUpdateVisibility,
    validateCommentUserId,
    validateCommentPostId
}