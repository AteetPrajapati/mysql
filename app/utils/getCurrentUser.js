const jwt = require("jsonwebtoken");
const getuser = (req) => {
    return (jwt.decode(req.cookies.jwt)) ?? {};
}

module.exports = getuser;