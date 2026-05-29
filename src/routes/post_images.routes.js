const { Router } = require("express");
const router = Router();
const { createPostImage, getPostImages, getPostImageById, updatePostImage, deletePostImage } = require('../controllers/post_images.controller')
const { validatePostImagestId, validateSchemaPostImages, validatePostByImageId } = require('../middlewares/post_images.middleware')
const { validateUserId } = require('../middlewares/user.middleware')
const { validatePostId, validatePostByUser } = require('../middlewares/post.middleware')
const { upload } = require ('../middlewares/upload.middleware')

const validateIdsAndPostByUser = [ validateUserId, validatePostId, validatePostByUser ]

router.post('/user/:id/post/:id_post/images', upload.single('image') , validateIdsAndPostByUser, createPostImage);
router.get('/user/:id/post/:id_post/images', validateIdsAndPostByUser, getPostImages);
router.get('/user/:id/post/:id_post/images/:id_pi', validateIdsAndPostByUser, validatePostImagestId, validatePostByImageId, getPostImageById);
router.delete('/user/:id/post/:id_post/images/:id_pi', validateIdsAndPostByUser, validatePostImagestId, validatePostByImageId, deletePostImage);
// router.put('/user/:id/post/:id_post/images/:id_pi', validateSchemaPostImages, validateIdsAndPostByUser, validatePostImagestId, validatePostByImageId,  updatePostImage);

module.exports = router;