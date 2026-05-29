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

    // images: Joi.array()
    // .items(
    //     Joi.object({
    //             url_image: Joi.string().required().messages({
    //                 'string.empty' : 'La url no puede ser vacia',
    //                 'any.required': 'La url es obligatoria'
    //         })
    //     })
    // ),

    tags: Joi.array()
    .items(
        Joi.number().integer().positive().messages({
        'number.base': 'El id de tag debe ser número',
        'number.integer': 'El id debe ser entero',
        'number.positive': 'El id debe ser positivo'
    })
  )
  .messages({
    'array.base': 'tags debe ser un array'
  })
})

module.exports = {
    postSchema
}