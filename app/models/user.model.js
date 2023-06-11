const { DataTypes } = require('sequelize');
const db = require('../../config/sequelize');
const RoleModel = require('./role.model');

const User = db.define('user', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    dob: {
        type: DataTypes.DATE,
        allowNull: false
    },
    mobile_number: {
        type: DataTypes.STRING
    },
    token: {
        type: DataTypes.STRING
    }
}, {
    timestamps: true,
    freezeTableName: true
});

User.belongsTo(RoleModel, { as: "role" });
RoleModel.hasMany(User, { as: "users"});

module.exports = User;