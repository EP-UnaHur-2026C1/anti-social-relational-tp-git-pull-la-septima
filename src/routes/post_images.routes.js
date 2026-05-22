const { Router } = require("express");
const router = Router();
const { createPostImage, getPostImages, getPostImageById, updatePostImage, deletePostImage } = require('../controllers/post_images.controller')
const { validatePosImagestId, validateSchemaPostImages } = require('../middlewares/post_images.middleware')
router.post('/user/:id/post/:id_post/images', createPostImage);
router.get('/user/:id/post/:id_post/images', getPostImages);
router.get('/user/:id/post/:id_post/images/:id_pi', getPostImageById);
router.put('/user/:id/post/:id_post/images/:id_pi', updatePostImage);
router.delete('/user/:id/post/:id_post/images/:id_pi', deletePostImage);
module.exports = router;