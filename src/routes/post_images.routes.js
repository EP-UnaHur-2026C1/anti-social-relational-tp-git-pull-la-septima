const { Router } = require("express");
const router = Router();
const { createPostImage, getPostImages, getPostImageById, updatePostImage, deletePostImage } = require('../controllers/post_images.controller')

router.post('/user/:id_user/post/:id_post/images', createPostImage);
router.get('/user/:id_user/post/:id_post/images', getPostImages);
router.get('/user/:id_user/post/:id_post/images/:id', getPostImageById);
router.put('/user/:id_user/post/:id_post/images/:id', updatePostImage);
router.delete('/user/:id_user/post/:id_post/images/:id', deletePostImage);
module.exports = router;