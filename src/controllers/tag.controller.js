const { Tag } = require('../db/models')

const createTag = async (req, res) => {
    try {
        const nombre = req.body
        const tag = Tag.create(nombre)
        res.status(201).json({message: "Tag creado exitosamente"})
        return 
    } catch (err) {
        res.status(500).json({message: `${err}`})
        return
    }
}

const deleteTag = async (req, res) => {
    try {
        const { id } = req.params
        const deleteTag = Tag.destroy({where:{id}})
        res.status(200).json({message: `Tag eliminado exitosamente`})
        return
    } catch (err) {
        res.status(500).json({message: `${err}`})
        return
    }
}

module.exports = {
    createTag,
    deleteTag
}