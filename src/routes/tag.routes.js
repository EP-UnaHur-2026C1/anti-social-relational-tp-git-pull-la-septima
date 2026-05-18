const { Router } = require('express')
const router = Router()
const { createTag } = require('../controllers/tag.controller')

router.post('/', createTag)

module.exports = router;