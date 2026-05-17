const { Router } = require("express");
const router = Router();
const { createPost, deletePost, getPosts, getAllPostsByUser, getOnePostByUser , updatePostByUser} = require('../controllers/post.controller')

router.post('/:id_user', createPost);
router.delete('/:id', deletePost);
router.get('/', getPosts);
router.get('/user/:id', getAllPostsByUser);
router.get('/user/:id/post/:id_post', getOnePostByUser);
router.put('/user/:id/post/:id_post', updatePostByUser);
module.exports = router;