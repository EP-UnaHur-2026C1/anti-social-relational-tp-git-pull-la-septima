const { Router } = require("express");
const router = Router();
const {createComment, getCommentsByPost, deleteComment, updateComment, updateVisibilityByMonth} = require('../controllers/comment.controller');
const { validateCommentId, validateSchemaComment, validateSchemaUpdateVisibility, validateCommentUserId, validateCommentPostId } = require('../middlewares/comment.middleware')

router.post('/user/:id_user/post/:id_post', validateSchemaComment, validateCommentUserId, validateCommentPostId, createComment);
router.get('/post/:id_post', validateCommentPostId, getCommentsByPost);
router.delete('/delete/:id', validateCommentId, deleteComment); 
router.put('/update/:id', validateSchemaComment, validateCommentId, updateComment);   
router.patch('/updateVisibility', validateSchemaUpdateVisibility, updateVisibilityByMonth)

module.exports = router;
    