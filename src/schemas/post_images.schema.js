const Joi = require('joi')

const postImagnesSchema = Joi.object({
    url_image : Joi.string()
    .alphanum()
    .required()
    .messages({
        'string.empty' : 'La url de la imagen no puede ser vacia',
        'string.alphanum' : 'La url de la imagen no puede contener espacios',
        'any.requied' : 'La url de la imagen es obligatoria'
    })
})

module.exports = {
    postImagnesSchema
}