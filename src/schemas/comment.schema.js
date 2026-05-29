const Joi = require('joi');

const commentSchema = Joi.object({
    comentario: Joi.string()
    .max(255)
    .required()
    .messages({
        'string.empty': 'El comentario no puede ser vacio',
        'string.max': 'El comentario no puede superar los 255 caracteres',
        'any.required': 'El comentario es obligatorio'
    })
})

const updateVisibilitySchema = Joi.object({
    mes: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
        'number.base': 'El mes debe ser un numero valido',
        'number.integer': 'El mes debe ser un numero entero',
        'number.min': 'El mes no puede ser negativo',
        'any.required': 'El mes es obligatorio'
    })
})

module.exports = {
    commentSchema,
    updateVisibilitySchema
}