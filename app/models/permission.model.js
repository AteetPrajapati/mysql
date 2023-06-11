const { DataTypes } = require("sequelize");
const db = require("../../config/sequelize");

const PermissionModel = db.define('permission', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = PermissionModel;