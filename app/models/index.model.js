const Moongose = require('mongoose');
const { Schema } = Moongose;
const userModel = require('./user.model');
const roleModel = require('./role.model');
require('dotenv').config();

const db = {};
const mongodbUrl = `mongodb://${process.env.DB_MONGO_HOST}/${process.env.DB_MONGO_NAME}`

db.connection = Moongose.connect(mongodbUrl);

db.user = userModel(Moongose, Schema);
db.role = roleModel(Moongose, Schema);

module.exports = db;
