const responseCode = require("../utils/response-codes");
const db = require("../../config/sequelize");
const bcrypt = require('bcrypt');
const User = require("../models/user.model");
const RoleModel = require("../models/role.model");
const PermissionModel = require("../models/permission.model");
const jwt = require("jsonwebtoken");
const RolesPermissions = require("../models/roles_permissions.model");
const rcode = require("../utils/response-codes");

exports.findAll = async (req, res) => {
    const users = await User.findAll({
        where: {
            ...(req.params.id && { "id": req.params.id }),
        },
        include: {
            model: RoleModel,
            as: 'role',
            attributes: ['id', 'name'],
            include: {
                model: PermissionModel,
                as: 'permissions',
                attributes: ['name'],
                through: {
                    attributes: []
                },
                raw: true
            }
        }
    });
    res.send(users);
};

exports.create = async (req, res) => {
    await bcrypt.hash(req.body.password, 10).then(async (psw) => {
        let permissions = await RoleModel.findOne({
            where: {
                id: req.body.roleId
            },
            include: {
                model: PermissionModel,
                as: 'permissions',
                attributes: ['name'],
                through: {
                    attributes: []
                },
                raw: true
            },
        })
        permissions = await permissions.permissions.map((e) => e.name);
        let token = jwt.sign({ roles: permissions }, process.env.JWT_SECERT);
        const userreq = req.body;
        userreq.token = token;
        userreq.password = psw;
        try {
            let tempuser;
            await db.transaction(async function (transaction) {
                await User.create(userreq, { transaction }).then((data) => {
                    tempuser = data;
                });
            })
            let user = await User.findOne({ where: { id: tempuser.id }, include: { model: RoleModel, as: 'role', attributes: ['id', 'name'] } });
            await res.send(user);
        } catch (error) {
            res.status(responseCode.BadRequest).send(error);
        }
    })
};

exports.delete = async (req, res) => {
    try {
        await User.destroy({ where: { id: req.params.id } });
        res.status(rcode.OK).send({ message: "User Deleted Succefully" })
    } catch (error) {
        res.status(rcode.BadRequest).send({ message: "Somethong went Wrong!!" })
    }
}