const express = require("express");
const router = express.Router();
const userCon = require("../controllers/user");

router.post("/signup", userCon.add_user);
router.post("/login", userCon.loggin_user);
router.delete("/:id", userCon.delete_User);

module.exports = router;
