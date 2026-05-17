const { Router } = require("express");
const router = Router();
const { createPost, deletePost, getPosts, getAllPostsByUser, getOnePostByUser } = require('../controllers/post.controller')

router.post('/:id_user', createPost);
router.delete('/:id', deletePost);
router.get('/', getPosts);
router.get('/user/:id', getAllPostsByUser);
router.get('/user/:id/post/:id_post', getOnePostByUser);

module.exports = router;