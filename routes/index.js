const express = require('express');
const userRoutes = require('./user-routes');
const taskRoutes = require('./task-routes');

const router = express.Router();

router.use('/user', userRoutes);
router.use('/task', taskRoutes);

module.exports = router;