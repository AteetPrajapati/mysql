const { Sequelize } = require('sequelize');

const db = new Sequelize('postgres://postgres:sit@123@127.0.0.1:5432/sequelize', {
    dialect: 'postgres',
    protocol: 'postgres'
});


module.exports = db