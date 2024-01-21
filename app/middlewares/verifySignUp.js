const db = require('../models/index.model');

const User = db.user;
const Role = db.role;

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

verifySignUp.checkRolesExisted = async (req, res, next) => {
    const { roles } = req.body;

    if (roles.length) {
        const availableRoles = await Role.find({}, 'name -_id').exec();
        const rolesNames = availableRoles.map(role => role.name);

        for (let i = 0; i < roles.length; i++) {
            if (!rolesNames.includes(roles[i])) {
                return res.status(400).send({
                    message: `Failed! ${roles[i]} isn't a valid role`
                });
            }
        }
    }

    next();
};

module.exports = verifySignUp;