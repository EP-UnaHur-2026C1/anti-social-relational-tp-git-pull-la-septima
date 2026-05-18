const { Router } = require('express')
const router = Router()
const { createTag, deleteTag } = require('../controllers/tag.controller')

router.post('/', createTag)
router.delete('/:id', deleteTag)

module.exports = router;