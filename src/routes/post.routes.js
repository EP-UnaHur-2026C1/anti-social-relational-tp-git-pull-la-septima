const { Router } = require("express");
const router = Router();
const { createPost } = require('../controllers/post.controller')

router.post('/:id_user', createPost);

module.exports = router;