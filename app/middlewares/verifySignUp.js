const db = require('../models/index.model');

const User = db.user;

const verifySignUp = {};

verifySignUp.checkDuplicateUsernameOrEmail = async (req, res, next) => {
    const { username, email } = req.body;
    try {
        const user = await User.findOne({
            $or: [{ 'username': username }, { 'email': email }]
        });

        if (user) {
            return res.status(400).send({
                message: 'Ups! Username or email is already in use, please try again'
            });
        }
        else {
            next();
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Ups! Something is wrong');
    }
};

/*verifySignUp.checkRolesExisted = (req, res, next) => {
    const { roles } = req.body;

    if(roles){

    }
};*/

module.exports = verifySignUp;