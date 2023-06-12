const userRouter = require("./user.route");
const authRouter = require("./auth.route");
const roleRouter = require("./role.route");
const permissionRouter = require("./permission.route");
const { authorize } = require("../middlewares/auth.middleware");

module.exports = app => {
    app.use("/api/auth", authRouter);
    app.use("/api", authorize);
    app.use("/api/user", userRouter);
    app.use("/api/role", roleRouter);
    app.use("/api/permission", permissionRouter);
}