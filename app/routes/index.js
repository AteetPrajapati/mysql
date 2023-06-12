const userRouter = require("./user.route");
const authRouter = require("./auth.route");
const roleRouter = require("./role.route");
const permissionRouter = require("./permission.route");
const issueRouter = require("./issue.route");
const { authorize } = require("../middlewares/auth.middleware");
const { permit } = require("../middlewares/permit");

module.exports = app => {
    app.use("/api/auth", authRouter);
    app.use("/api", authorize);
    app.use("/api/user", userRouter);
    app.use("/api/role", permit.super_admin, roleRouter);
    app.use("/api/permission", permit.super_admin, permissionRouter);
    app.use("/api/issue", issueRouter);
}