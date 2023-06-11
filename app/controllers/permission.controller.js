const db = require("../../config/sequelize");
const PermissionModel = require("../models/permission.model");

exports.create = async (req, res) => {
    try {
        await db.transaction(async function (transaction) {
            const permission = await PermissionModel.create(req.body, { transaction });
            await res.send(permission);
        })
    } catch (error) {
        res.send(error);
    }
};

exports.findAll = async (req, res) => {
    try {
        const rolePermissons = await PermissionModel.findAll();
        res.send(rolePermissons);
    } catch (error) {
        res.send(error);
    }
}