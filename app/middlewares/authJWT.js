const db = require('../models/index.model');
const JWT = require('jsonwebtoken');
require('dotenv').config();

const User = db.user;

const authJWT = {};

authJWT.verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({
            message: 'No token provided'
        });
    }

    JWT.verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: 'Unauthorized!'
                });
            }

            req.userId = decoded.id;
            next();
        }
    );
};

authJWT.isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);

        const isAdmin = user.roles.includes('admin');

        if (isAdmin) {
            next();
        }
        else {
            return res.status(403).send({
                message: 'Admin role required'
            });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Ups! Something is wrong');
    }
};

authJWT.isModerator = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);

        const isModerator = user.roles.includes('moderator');

        if (isModerator) {
            next();
        }
        else {
            return res.status(403).send({
                message: 'Moderator role required'
            });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Ups! Something is wrong');
    }
};

authJWT.isModeratorOrAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);

        const isModeratorOrAdmin = user.roles.some(role => role === 'admin' || role === 'moderator');

        if (isModeratorOrAdmin) {
            next();
        }
        else {
            return res.status(403).send({
                message: 'Moderator or Admin role required'
            });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Ups! Something is wrong');
    }
};

module.exports = authJWT;