const { DataTypes } = require('sequelize');
const db = require('../../config/sequelize');
const RoleModel = require('./role.model');
const issueModel = require('./issue.model');
const issuesUsersModels = require('./issues_assignees.model');
const issuesAssigneeModels = require('./issues_assignees.model');

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
RoleModel.hasMany(User, { as: "users" });

issueModel.belongsToMany(User, { through: issuesAssigneeModels, as: "assignees" });
User.hasMany(issueModel, { foreignKey: "issued_by", as: "issues" });

module.exports = User;