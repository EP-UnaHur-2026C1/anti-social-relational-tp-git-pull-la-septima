const Joi = require('joi');

const postSchema = Joi.object({
    texto: Joi.string()
    .max(225)
    .required()
    .messages({
        'string.empty': 'El texto no puede ser vacio',
        'string.max': 'El texto no puede superar los 225 caracteres',
        'any.required' : 'El texto es obligatorio'
    })
})

module.exports = {
    postSchema
}