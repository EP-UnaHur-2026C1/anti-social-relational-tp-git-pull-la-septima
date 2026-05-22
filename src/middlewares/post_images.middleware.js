const { validateSchema } = require("./generic.middleware");
const { Post_Images } = require("../db/models")
const { postImagnesSchema } = require("../schemas/post_images.schema")

const validateSchemaPostImages = validateSchema(postImagnesSchema)

const validatePostImagestId = async(req, res, next) => {
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

const validatePostByImageId = async (req, res, next) => {
    try {
        const {id_post, id_pi } = req.params

        const validate = await Post_Images.findOne({ where : { id: id_pi, id_post : id_post }})

        if(!validate) {
            res.status(404).json({message: `La imagen con id ${id_pi} no fue encontrada en relacion con el post ${id_post}`})
            return
        }
    } catch(err) {
        res.status(500).json({message :`${err}`})
        return
    }
    next()
}

module.exports = {
    validateSchemaPostImages,
    validatePostImagestId,
    validatePostByImageId
}
