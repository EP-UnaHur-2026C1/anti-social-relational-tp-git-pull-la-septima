const { Router } = require('express')
const router = Router()
const { createTag, deleteTag, updateTag, getAllTags, getTagById } = require('../controllers/tag.controller')

router.post('/', createTag)
router.get('/', getAllTags)
router.get('/:id', getTagById)
router.put('/:id', updateTag)
router.delete('/:id', deleteTag)

module.exports = router;