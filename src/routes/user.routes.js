const { Router } = require("express");
const router = Router();
const { createUser, updateUser, deleteUser} = require("../controllers/user.controller");

router.post("/", createUser);
router.put("/:nickname", updateUser);
router.delete("/:nickname",deleteUser);

module.exports = router;