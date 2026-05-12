const { Router } = require("express");
const router = Router();
const { createUser, updateUser } = require("../controllers/user.controller");

router.post("/", createUser);
router.put("/:id", updateUser);

module.exports = router;