const express = require('express')
const router = express.Router()
const UserController  = require('../controllers/users')
const checkAuth = require("../middleware/check-auth");

router.post("/signup", UserController.createUser);

router.post("/login", UserController.userLogin);

router.get("/:id" , UserController.getUser);

module.exports  = router;