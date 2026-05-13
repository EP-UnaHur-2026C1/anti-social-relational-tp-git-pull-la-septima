const { Router } = require("express");
const router = Router();
const { createUser, updateUser, deleteUser, getUserById, getAllUsers} = require("../controllers/user.controller");

router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id",deleteUser);
router.get("/:id", getUserById);
router.get("/", getAllUsers);

module.exports = router;