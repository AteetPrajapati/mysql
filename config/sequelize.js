const { Sequelize } = require('sequelize');

const db = new Sequelize("testseqlize", "root", "", {
    host: "localhost",
    dialect: 'mysql',
    protocol: 'postgres'
});


module.exports = db