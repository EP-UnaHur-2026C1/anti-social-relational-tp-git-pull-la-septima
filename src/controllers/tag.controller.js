const { Tag } = require('../db/models')

const createTag = async (req, res) => {
    try {
        const nombre = req.body
        const tag = Tag.create(nombre)
        res.status(201).json({message: "tag creado exitosamente"})
        return 
    } catch (err) {
        res.status(500).json({message: `${err}`})
        return
    }
}

module.exports = {
    createTag
}