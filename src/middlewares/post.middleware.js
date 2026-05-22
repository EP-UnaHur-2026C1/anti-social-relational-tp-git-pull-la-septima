const {validateId, validateSchema } = require("./generic.middleware");
const {Post} = require("../db/models")
const {postSchema} = require("../schemas/post.schema")

const validatePostId = validateId(Post)

const validateSchemaPost = validateSchema(postSchema)

const validatePostByUser = async(req , res , next) => {
    try{
        const id_post = req.params.id_post
        const id = req.params.id

        const validarPost = await Post.findOne({ where :{ id : id_post } && {id_user : id}});

        if (!validarPost){
            res.status(404).json({message : `el post con id ${id_post} no le pertenece a la persona con id ${id}`})
            return
        }
        
    }catch(err){
        res.status(500).json({message : `${err}`})
        return 
    }
    next()
}
module.exports = {
    validateSchemaPost,
    validatePostId,
    validatePostByUser
}