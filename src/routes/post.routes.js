const { Router } = require("express");
const router = Router();
const { createPost, deletePost, getPosts } = require('../controllers/post.controller')

router.post('/:id_user', createPost);
router.delete('/:id', deletePost);
router.get('/', getPosts);

module.exports = router;