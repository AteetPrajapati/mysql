const userRouter = require("./user.route");
const authRouter = require("./auth.route");
const roleRouter = require("./role.route");
const permissionRouter = require("./permission.route");

module.exports = app => {
    app.use("/api/user", userRouter);
    app.use("/api/auth", authRouter);
    app.use("/api/role", roleRouter);
    app.use("/api/permission", permissionRouter);
}