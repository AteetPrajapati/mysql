const { DataTypes } = require("sequelize");

const db = require("../../config/sequelize");

const issueModel = db.define('issue', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(1000)
    },
    status: {
        type: DataTypes.ENUM,
        defaultValue: 'To Do',
        values: ["To Do", "Approved", "Done", "In Review", "Cancelled"],
        allowNull: false,
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    updated_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
})

module.exports = issueModel;