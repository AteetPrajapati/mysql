const jwt = require("jsonwebtoken");

exports.permit = {
    super_admin: async (req, res, next) => {
        let token = await req.cookies.permissons;
        if (token) {
            jwt.verify(token, process.env.JWT_SECERT, (err, data) => {
                let roles = (jwt.decode(token)).roles;
                roles.includes('createAndupdateUser') ?
                    next() :
                    res.status(401).json({ message: "You don't have permission" });
            })
        } else {
            return res
                .status(401)
                .json({ message: "You don't have permission" })
        }
    }
}