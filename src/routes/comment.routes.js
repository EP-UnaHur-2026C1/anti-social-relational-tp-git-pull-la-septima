const { Router } = require("express");
const router = Router();
const {createComment, getCommentsByPost, deleteComment, updateComment, updateVisibilityByMonth} = require('../controllers/comment.controller');

router.post('/user/:id_user/post/:id_post', createComment);
router.get('/post/:id_post', getCommentsByPost);
router.delete('/delete/:id', deleteComment); 
router.put('/update/:id', updateComment);   
router.patch('/updateVisibility', updateVisibilityByMonth)

module.exports = router;
    