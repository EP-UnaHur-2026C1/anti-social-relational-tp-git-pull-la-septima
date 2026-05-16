const { Router } = require("express");
const router = Router();
const { createPost, deletePost } = require('../controllers/post.controller')

router.post('/:id_user', createPost);
router.delete('/:idDel', deletePost);

module.exports = router;