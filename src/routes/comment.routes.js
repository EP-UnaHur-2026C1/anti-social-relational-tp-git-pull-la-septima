const { Router } = require("express");
const router = Router();
const {createComment} = require('../controllers/comment.controller');

router.post('/user/:id_user/post/:id_post', createComment);

module.exports = router;
    