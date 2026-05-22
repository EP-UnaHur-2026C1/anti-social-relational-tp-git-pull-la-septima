const { Router } = require("express");
const router = Router();
const { createUser, updateUser, deleteUser, getUserById, getAllUsers} = require("../controllers/user.controller");
const {validateSchemaUser, validateUserId} = require("../middlewares/user.middleware")

router.post("/", validateSchemaUser, createUser);
router.put("/:id", validateSchemaUser, validateUserId, updateUser);
router.delete("/:id",validateUserId ,deleteUser);
router.get("/:id",validateUserId , getUserById);
router.get("/", getAllUsers);

module.exports = router;