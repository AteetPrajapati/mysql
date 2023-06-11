const db = require("../../config/sequelize");
const RoleModel = require("../models/role.model");
const RolesPermissions = require("../models/roles_permissions.model");

exports.create = async (req, res) => {
    try {
        await db.transaction(async function (transaction) {
            const role = await RoleModel.create(req.body, { transaction });
            await res.send(role);
        })
    } catch (error) {
        res.send(error);
    }
};

exports.findAll = async (req, res) => {
    try {
        const userRoles = await RoleModel.findAll({ include: ['users', 'permissions'] });
        res.send(userRoles);
    } catch (error) {
        res.send(error);
    }
}

exports.addPermissions = async (req, res) => {
    try {
        await db.transaction(async function (transaction) {
            const role = await RolesPermissions.bulkCreate(req.body, { transaction });
            await res.send(role);
        })
    } catch (error) {
        res.send(error);
    }
}