const Joi = require('joi');

const tagSchema = Joi.object({
    nombre: Joi.string().alphanum()
    .max(20)
    .required()
    .messages({
        'string.empty': 'El nombre no puede ser vacio',
        'string.max': 'El nombre no puede superar los 20 caracteres',
        'string.alphanum': 'El nombre no puede contener espacios',
        'any.required' : 'El nombre es obligatorio'
    })
})

module.exports = {
    tagSchema
}