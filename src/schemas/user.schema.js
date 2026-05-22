const Joi = require('joi');

const userSchema = Joi.object({
    nickname: Joi.string()
    .alphanum()
    .max(20)
    .required()
    .messages({
        'string.empty': 'El nickname no puede ser vacio',
        'string.max': 'El nickname no puede superar los 20 caracteres',
        'string.alphanum': 'El nickname no puede contener espacios',
        'any.required' : 'El nickname es obligatorio'
    })
})

module.exports = {
    userSchema
}