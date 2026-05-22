const { validateSchema } = require("./generic.middleware");
const { Post_Images } = require("../db/models")
const { postImagnesSchema } = require("../schemas/post_images.schema")

const validateSchemaPostImages = validateSchema(postImagnesSchema)

const validatePosImagestId = async(req, res, next) => {
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

module.exports = {
    validateSchemaPostImages,
    validatePosImagestId
}
