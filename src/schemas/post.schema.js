const Joi = require('joi');

const postSchema = Joi.object({
    texto: Joi.string()
    .max(225)
    .required()
    .messages({
        'string.empty': 'El texto no puede ser vacio',
        'string.max': 'El texto no puede superar los 225 caracteres',
        'any.required' : 'El texto es obligatorio'
    }),

    images: Joi.array()
    .items(
        Joi.object({
                url_image: Joi.string().required().messages({
                    'string.empty' : 'La url no puede ser vacia',
                    'any.required': 'La url es obligatoria'
            })
        })
    ),

    tags: Joi.array()
    .items(
        Joi.object({
            nombre: Joi.string().required().messages({
                'string.empty': 'El nombre de la etiqueta no puede ser vacio',
                'any.required': 'El nombre de la etiqueta es obligatorio'
            })
        })
    )
})

module.exports = {
    postSchema
}