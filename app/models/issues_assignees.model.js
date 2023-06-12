const { DataTypes } = require("sequelize");
const db = require("../../config/sequelize");

const issuesAssigneeModels = db.define('issues_assignees', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
});

module.exports = issuesAssigneeModels;