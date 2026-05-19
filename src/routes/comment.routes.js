const { Router } = require("express");
const router = Router();
const {createComment, getCommentsByPost, deleteComment, updateComment} = require('../controllers/comment.controller');

router.post('/user/:id_user/post/:id_post', createComment);
router.get('/post/:id_post', getCommentsByPost);
router.delete('/delete/:id', deleteComment); 
router.put('/update/:id', updateComment);   

module.exports = router;
    