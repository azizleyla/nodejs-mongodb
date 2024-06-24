const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require("dotenv").config()

const authentification = (
    req,
    res,
    next,
) => {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = header.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    req[" currentUser"] = decode;
    next();
};
module.exports = {
    authentification
}