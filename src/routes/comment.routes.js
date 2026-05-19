const { Router } = require("express");
const router = Router();
const {createComment, getCommentsByPost} = require('../controllers/comment.controller');

router.post('/user/:id_user/post/:id_post', createComment);
router.get('/post/:id_post', getCommentsByPost);

module.exports = router;
    