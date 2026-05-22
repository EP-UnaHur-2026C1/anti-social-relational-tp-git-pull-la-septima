const { Router } = require('express')
const router = Router()
const { createTag, deleteTag, updateTag, getAllTags, getTagById } = require('../controllers/tag.controller')
const {validateTagId, validateSchemaTag} = require("../middlewares/tag.middleware")

router.post('/', validateSchemaTag ,createTag)
router.get('/', getAllTags)
router.get('/:id',validateTagId, getTagById)
router.put('/:id', validateSchemaTag, validateTagId, updateTag)
router.delete('/:id', validateTagId, deleteTag)

module.exports = router;