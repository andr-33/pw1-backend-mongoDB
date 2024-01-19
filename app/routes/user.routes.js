const express = require('express');
const userController = require('../controllers/user.controller');

const userRouter = express();

userRouter.post('/api/user/signup', userController.signup);

module.exports = userRouter;