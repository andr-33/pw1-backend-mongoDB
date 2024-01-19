const db = require('../models/index.model');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = db.user;

const authController = {};

authController.signin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({
            'username': username
        });

        if (!user) {
            return res.status(404).send({
                message: 'User not found'
            });
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: 'Invalid password'
            });
        }

        const token = JWT.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400
            }
        );

        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: user.roles,
            accessToken: token
        });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
};

module.exports = authController;