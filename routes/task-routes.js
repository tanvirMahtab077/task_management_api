const express = require("express");
const router = express.Router();
const { createTask } = require("../controllers/task-controller");
const {verifyToken}  = require("../middleware/tokenVerification");

router.use(verifyToken)
router.post("/create", createTask);

module.exports = router;
