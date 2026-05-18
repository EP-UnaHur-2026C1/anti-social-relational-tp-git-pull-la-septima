const { Tag } = require('../db/models')

const createTag = async (req, res) => {
    try {
        const nombre = req.body
        await Tag.create(nombre)
        res.status(201).json({ message: "Tag creado exitosamente" })
        return
    } catch (err) {
        res.status(500).json({ message: `${err}` })
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
        res.status(500).json({ message: `${err}` })
        return
    }
}

const updateTag = async (req, res) => {
    try {
        const { id } = req.params
        const datosTag = req.body
        await Tag.update(datosTag, { where: { id } })
        res.status(200).json(datosTag)
        return
    } catch (err) {
        res.status(500).json({ message: `${err}` })
        return
    }
}

const getAllTags = async (_, res) => {
    try {
        const tags = await Tag.findAll()
        res.status(200).json(tags)
        return
    } catch (err) {
        res.status(500).json({ message: `${err}` })
        return
    }
}

const getTagById = async (req, res) => {
    try {
        const { id } = req.params
        const tag = await Tag.findByPk(id)
        res.status(200).json(tag)
    } catch (err) {
        res.status(500).json({ message: `${err}` })
        return
    }
}

module.exports = {
    createTag,
    deleteTag,
    updateTag,
    getAllTags,
    getTagById
}