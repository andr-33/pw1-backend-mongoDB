const db = require('../models/index.model');
const bcrypt = require('bcryptjs');

const User = db.user;

const userController = {};

userController.signup = async (req, res) => {
    const { username, email, password, roles } = req.body;
    try {
        const user = new User({
            'username': username,
            'email': email,
            'password': bcrypt.hashSync(password, 8),
        });

        if (roles.length) {
            user.roles = roles;
        }
        else {
            user.roles = ['user'];
        }

        await user.save();

        res.status(201).send({
            message: 'The user was registered successfully :)'
        });
    }
    catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};

userController.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

userController.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

userController.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

userController.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

module.exports = userController;