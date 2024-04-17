const express = require('express')
const { login, logout, register } = require("./../controller/auth.js")

const router = express.Router()

router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)

exports.module = router;