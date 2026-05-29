const { validateSchema } = require("./generic.middleware");
const {Post} = require("../db/models")
const {postSchema} = require("../schemas/post.schema")



const validateSchemaPost = validateSchema(postSchema)

const validatePostId = async(req, res, next) => {
        try{
            const {id_post} = req.params
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


const validatePostByUser = async(req , res , next) => {
    try{
        const id_post = req.params.id_post
        const id = req.params.id

        const validarPost = await Post.findOne({ where :{ id : id_post, id_user : id}});

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