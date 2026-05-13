const { Router } = require("express");
const router = Router();
const { createUser, updateUser, deleteUser, getUserById} = require("../controllers/user.controller");

router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id",deleteUser);
router.get("/:id", getUserById);

module.exports = router;