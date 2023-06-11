const { DataTypes } = require("sequelize");
const db = require("../../config/sequelize");

const RoleModel = db.define('role', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = RoleModel;