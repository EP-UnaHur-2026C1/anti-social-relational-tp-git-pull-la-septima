const { Router } = require("express");
const router = Router();
const { createPost, deletePost, getPosts, getAllPostsByUser, getOnePostByUser , updatePostByUser} = require('../controllers/post.controller')
const {  validateSchemaPost,validatePostId,validatePostByUser} = require("../middlewares/post.middleware")
const { validateUserId} = require("../middlewares/user.middleware")
const { upload } = require ('../middlewares/upload.middleware')

router.post('/:id',upload.array('images', 10) ,validateSchemaPost,validateUserId, createPost);
router.delete('/:id_post',validatePostId, deletePost);
router.get('/', getPosts);
router.get('/user/:id',validateUserId, getAllPostsByUser);
router.get('/user/:id/post/:id_post',validateUserId,validatePostId, validatePostByUser,getOnePostByUser);
router.put('/user/:id/post/:id_post',validateSchemaPost, validateUserId,validatePostId,validatePostByUser,updatePostByUser);
module.exports = router;