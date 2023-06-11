const dootenv = require("dotenv");
const db = require("./config/sequelize");
dootenv.config();
require("./config/express");
// const Relations = require("./app/models/index");
try {
    db.authenticate();
    db.sync({ alter: true });
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}