const express = require('express');
const authController = require('../controllers/auth.controller');

const authRouter = express();

authRouter.post('/api/authentication/signin', authController.signin);

module.exports = authRouter;