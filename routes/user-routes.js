const express = require("express");
const { signup,login, getUser } = require("../controllers/user-controller");
const {verifyToken} = require ("../middleware/tokenVerification")
const router = express.Router();

router.post('/login',login);
router.post('/signup',signup);
router.get('/user',verifyToken,getUser);

module.exports = router;
