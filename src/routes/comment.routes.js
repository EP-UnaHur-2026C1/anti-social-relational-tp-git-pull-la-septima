const { Router } = require("express");
const router = Router();
const {createComment, getCommentsByPost, deleteComment} = require('../controllers/comment.controller');

router.post('/user/:id_user/post/:id_post', createComment);
router.get('/post/:id_post', getCommentsByPost);
router.delete('/delete/:id', deleteComment);

module.exports = router;
    