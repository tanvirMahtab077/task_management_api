const express = require("express");
const { signup,login, getUser } = require("../controllers/user-controller");
const {verifyToken} = require ("../middleware/tokenVerification")
const {refreshToken} = require ("../middleware/refreshTokenMiddleware")
const router = express.Router();

router.post('/login',login);
router.post('/signup',signup);
router.get('/userlist',verifyToken,getUser);
router.get('/refresh',refreshToken,verifyToken,getUser);

module.exports = router;
