const express = require('express');
const cors = require('cors');
const db = require('./app/models/index.model');
require('dotenv').config();

const server = express();
const corsConfig = {
    origin: process.env.CLIENT_HOST
};
const PORT = process.env.SERVER_PORT || 8091;

server.use(cors(corsConfig));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(require('./app/routes/user.routes'));
server.use(require('./app/routes/auth.routes'));

const Role = db.role;

db.connection
    .then(async () => {
        console.log('MongoDB connection was successful');
        await initializeRoles();
    })
    .catch((err) => console.log(`MongoDB connection error: ${err}`));

async function initializeRoles() {

    const alreadyInitialized = await Role.find();

    if (!alreadyInitialized.length) {
        await Role.insertMany([
            {
                name: 'user'
            },
            {
                name: 'moderator'
            },
            {
                name: 'admin'
            }
        ]);
        console.log('Roles initialized successfully');
    } else {
        console.log('Roles already exist, skipping initialization');
    }

}

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});