const { Router } = require("express");
const router = Router();
const { createPost, deletePost, getPosts, getAllPostsByUser } = require('../controllers/post.controller')

router.post('/:id_user', createPost);
router.delete('/:id', deletePost);
router.get('/', getPosts);
router.get('/user/:id', getAllPostsByUser);

module.exports = router;