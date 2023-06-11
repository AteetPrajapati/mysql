const { DataTypes } = require("sequelize");
const db = require("../../config/sequelize");
const PermissionModel = require("./permission.model");
const RoleModel = require("./role.model");

const RolesPermissions = db.define('roles_permissions', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

PermissionModel.belongsToMany(RoleModel, { as: 'roles', through: RolesPermissions });
RoleModel.belongsToMany(PermissionModel, { as: 'permissions', through: RolesPermissions });

// RoleModel.belongsToMany(RolesPermissions, { as: 'roles', through: PermissionModel });
// RolesPermissions.belongsToMany(PermissionModel, { as: 'permissions', through: RoleModel });

module.exports = RolesPermissions;

