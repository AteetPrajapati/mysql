const responseCode = require("../utils/response-codes");
const db = require("../../config/sequelize");
const bcrypt = require('bcrypt');
const User = require("../models/user.model");
const RoleModel = require("../models/role.model");
const PermissionModel = require("../models/permission.model");
const jwt = require("jsonwebtoken");

exports.findAll = async (req, res) => {
    const users = await User.findAll({
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
        let token = jwt.sign({ roleId: req.body.roleId }, process.env.JWT_SECERT);
        const userreq = req.body;
        userreq.token = token;
        userreq.password = psw;
        try {
            await db.transaction(async function (transaction) {
                await User.create(userreq, { transaction }).then(async (data) => {
                    console.log(data.id);
                    await User.findOne({ where: { id: data.id }, include: { model: RoleModel, as: 'role', attributes: ['id', 'name'] } }).then((user) => {
                        res.send(user);
                    })
                });
            })
        } catch (error) {
            res.status(responseCode.BadRequest).send({ error: (error.errors.map((e) => e.message)).toString() });
        }
    })
};