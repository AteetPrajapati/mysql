const User = require("../models/user.model");
const responseCode = require("../utils/response-codes");
const db = require("../../config/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const RoleModel = require("../models/role.model");
const PermissionModel = require("../models/permission.model");

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(responseCode.BadRequest).json({
            message: "Username or password not present",
        })
    }

    try {
        let user = await User.findOne({ where: { email }, include: { model: RoleModel, as: "role", include: { model: PermissionModel, as: 'permissions' } } });
        if (!user) {
            res.status(responseCode.BadRequest).json({
                message: "Login not successful",
                error: "User not found"
            });
            return;
        }
        else {
            bcrypt.compare(password, user.password).then(function (result) {
                if (result) {
                    let jwtSecret = process.env.JWT_SECERT;

                    const token = jwt.sign(
                        { id: user._id, email: user.email },
                        jwtSecret
                    );
                    res.cookie("jwt", token, {
                        httpOnly: true
                    });
                    res.cookie("permissons", user.token, {
                        httpOnly: true
                    });
                    user.roles = (jwt.decode(user.token)).roles;
                    user.token = null;
                    res.status(responseCode.OK).json({
                        message: "Login successful",
                        user,
                    });
                } else {
                    res.status(responseCode.BadRequest).json({ message: "Email Or password Is Wrong!!!" })
                }
            })
        }
    } catch (err) {
        res.status(responseCode.SomethingWrong).json({
            message: "An error occurred",
            error: err.message,
        })
    }
}
