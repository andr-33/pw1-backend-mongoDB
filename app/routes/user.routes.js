const express = require('express');
const userController = require('../controllers/user.controller');
const verifySignUp = require('../middlewares/verifySignUp');

const userRouter = express();

userRouter.post(
    '/api/user/signup',
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
    ],
    userController.signup
);

module.exports = userRouter;