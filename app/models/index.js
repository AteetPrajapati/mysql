const RoleModel = require("./role.model");
const User = require("./user.model");

const Relations = () => {
    User.associate = function () {
        User.belongsTo(RoleModel, { foreignKey: 'roleId' });
    };
    RoleModel.associate = function () {
        RoleModel.hasMany(User, { as: "users" });
    }
}

module.exports = Relations
